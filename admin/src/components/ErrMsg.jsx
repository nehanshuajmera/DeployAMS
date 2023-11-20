import { useAllData } from '../context/AllDataContext'
import { useLogin } from '../context/LoginContext'

const ErrMsg = () => {
    const {errorMsg} = useLogin()
    const {msg} = useAllData()
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
              msg &&
            <div
              className={`w-full py-1 px-2 rounded-md flexCenter bg-primary `}
            >
              <h4 className="text-center text-white ">{msg}</h4>
            </div>

            }
    </>
  )
}

export default ErrMsg
