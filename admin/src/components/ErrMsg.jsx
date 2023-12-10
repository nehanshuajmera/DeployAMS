

const ErrMsg = () => {
    const errorMsg=false;
  return (
    <>
       {
              errorMsg &&
            <div
              className={`w-full py-1 px-2 rounded-md flexCenter bg-primary `}
            >
              <h4 className="text-center text-white ">{errorMsg}</h4>
            </div>

            }
       {
              // msg &&
            <div
              // className={`w-[40%] fixed top-0 left-0 translate-x-[50%] py-1 px-2 rounded-md flexCenter ${msgType?" bg-green-400":" bg-red-400"} z-10 `}
            >
              <h4 className="text-center text-white ">{}</h4>
            </div>

            }
    </>
  )
}

export default ErrMsg
