import { useLogin } from '../context/LoginContext'

const ErrMsg = () => {
    const {errorMsg} = useLogin()
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
    </>
  )
}

export default ErrMsg
