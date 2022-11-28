import { Menu } from '@headlessui/react'

type Items =
  | {
      item: string
      function?: (params: any) => any
    }
  | false

interface Props {
  title: string
  items: Items[]
  children: JSX.Element
  space?: string
  position?: string
  src?: string
}

export const Dropdown = ({
  title,
  items,
  children,
  space,
  position,
}: Props) => {
  return (
    <div onClick={(e) =>  e.stopPropagation()} className="relative">
      <Menu>
        <div className={style.wrapperMenuButtonAndItems + space}>
          <Menu.Button title={title} className={style.menuButton}>
            {children}
          </Menu.Button>
          <Menu.Items className={style.items + position}>
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {item && (
                  <a onClick={item.function} className={style.item}>
                    {item.item}
                  </a>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </div>
      </Menu>
    </div>
  )
}

const style = {
  wrapperMenuButtonAndItems: `flex flex-col items-center `,
  menuButton: `cursor-pointer text-dusk-main dark:text-dawn-main`,
  items: `shadow-sm border border-dawn-weak/20 dark:border-dusk-weak/20 z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong `,
  item: `hover:bg-prime-blue whitespace-nowrap max-w-[300px] truncate hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer`,
}
