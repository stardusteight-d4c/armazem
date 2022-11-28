import axios from 'axios'
import {
  addConnection,
  rejectConnection,
  removeConnection,
  sendRequest,
} from '../services/api-routes'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { success } from './Toasters'
import { getCurrentUserAccount } from '../store/reducers/current-user-data'
import { Dropdown } from './Dropdown'

interface Props {
  userMetadata: User
  currentAccount: Account
}

export const ConnectionStatus = ({ userMetadata, currentAccount }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const dispatch = useAppDispatch()

  const sendRequestToUser = async () => {
    await axios
      .post(sendRequest, {
        to: userMetadata._id,
        from: currentUser?._id,
      })
      .then(async ({ data }) => {
        success(data.msg)
        await dispatch(getCurrentUserAccount())
      })
      .catch((error) => console.log(error.toJSON()))
  }

  const createConnection = async () => {
    await axios
      .post(addConnection, {
        to: userMetadata._id,
        from: currentUser?._id,
      })
      .then(async () => {
        await dispatch(getCurrentUserAccount())
      })
      .catch((error) => console.log(error.toJSON()))
  }

  const deleteUserConnection = async () => {
    await axios
      .post(removeConnection, {
        to: userMetadata._id,
        from: currentUser?._id,
      })
      .then(async () => {
        await dispatch(getCurrentUserAccount())
      })
      .catch((error) => console.log(error.toJSON()))
  }

  const rejectRequestConnection = async () => {
    await axios
      .post(rejectConnection, {
        to: userMetadata._id,
        from: currentUser?._id,
      })
      .then(async () => {
        await dispatch(getCurrentUserAccount())
      })
      .catch((error) => console.log(error.toJSON()))
  }

  const unsendRequestConnection = async () => {
    await axios
      .post(rejectConnection, {
        to: currentUser?._id,
        from: userMetadata._id,
      })
      .then(async () => {
        await dispatch(getCurrentUserAccount())
      })
      .catch((error) => console.log(error.toJSON()))
  }

  const requestAlreadySentStatus = () => {
    const verificationResult = currentAccount.requestsSent.map((requests) => {
      if (requests.to === userMetadata._id) {
        return true
      } else {
        return false
      }
    })
    return verificationResult[0]
  }

  const requestAlreadyReceivedStatus = () => {
    const verificationResult = currentAccount.requestsReceived.map(
      (requests) => {
        if (requests.from == userMetadata._id) {
          return true
        } else {
          return false
        }
      }
    )
    return verificationResult[0]
  }

  const connectWithThisUser = () => {
    const verificationResult = currentAccount.connections.map((connection) => {
      if (connection.with == userMetadata._id) {
        return true
      } else {
        return false
      }
    })
    return verificationResult[0]
  }

  const requestAlreadySentItems = [
    { item: 'Unsend', function: () => unsendRequestConnection() },
    { item: 'Cancel' },
  ]

  const requestAlreadyReceivedItems = [
    { item: 'Accept', function: () => createConnection() },
    { item: 'Reject', function: () => rejectRequestConnection() },
    { item: 'Cancel' },
  ]

  const connectWithThisUserItems = [
    { item: 'Remove', function: () => deleteUserConnection() },
    { item: 'Cancel' },
  ]

  const sendRequestItems = [
    { item: 'Send request', function: () => sendRequestToUser() },
    { item: 'Cancel' },
  ]

  const HandleRequestComponent = () => {
    if (requestAlreadySentStatus()) {
      return (
        <div className="flex items-center">
          <i className="ri-link mr-1 text-orange" />
          <Dropdown
            title="Request sent"
            space={style.space}
            items={requestAlreadySentItems}
          >
            <span className="text-orange">Request sent</span>
          </Dropdown>
        </div>
      )
    }
    if (requestAlreadyReceivedStatus()) {
      return (
        <div className="flex items-center">
          <i className="ri-link mr-1 text-prime-blue" />
          <Dropdown
            title="Accept request"
            space={style.space}
            items={requestAlreadyReceivedItems}
          >
            <span className="text-prime-blue">Accept request</span>
          </Dropdown>
        </div>
      )
    }
    if (connectWithThisUser()) {
      return (
        <div className="flex items-center">
          <i className="ri-link mr-1 text-green" />
          <Dropdown
            title="Connected"
            space={style.space}
            items={connectWithThisUserItems}
          >
            <span className="text-green">Connected</span>
          </Dropdown>
        </div>
      )
    } else {
      return (
        <div className="flex items-center">
          <i className="ri-link mr-1" />
          <Dropdown
            title="Send request"
            space={style.space}
            items={sendRequestItems}
          >
            <span>Send request</span>
          </Dropdown>
        </div>
      )
    }
  }
  return HandleRequestComponent()
}

const style = {
  space: `space-y-6`
}
