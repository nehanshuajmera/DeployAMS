const TopOfPage = (props) => {
  return (
    <div className='w-full h-[150px] bg-primary relative '>
      <div className="flex flex-col items-stretch gap-4 pl-6 pt-2">
        <h4 className="text-white text-4xl font-semibold">{props.pageName}</h4>
        <span className="text-sm text-dimWhite cursor-pointer">{props.pagePath}</span>
      </div>
      <div className="absolute bg-dimWhite rounded-t-[20px] bottom-0 h-11 w-full"></div>
    </div>
  )
}

export default TopOfPage
