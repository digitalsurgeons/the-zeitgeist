type Props = {
  children: JSX.Element | string
  className?: string
  href?: string
  target?: string
  rel?: string
}

export const Button = ({ children, className, href, target, rel }: Props) => {
  const classNames =
    'inline-flex items-center justify-center py-3 pl-5 pr-6 mx-auto transition duration-300 bg-teal-500 rounded-lg hover:fill-zinc-800 fill-white group text-zinc-900 hover:bg-white ' +
    className

  const link = (
    <a className={classNames} href={href} target={target} rel={rel}>
      {children}
    </a>
  )
  const button = <button className={classNames}>{children}</button>

  return href ? link : button
}
