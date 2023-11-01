import Login from "./pages/Login"

function App() {

  return (
    <div className="w-screen overflow-hidden h-screen flex items-center justify-center">
      {/* <div className=" bg-green-500 h-[170px] w-[170px] rounded-full p-[2px] flex items-center justify-center cursor-pointer hover:scale-110 duration-500">
        <div className="bg-white w-full h-full flex items-center justify-center rounded-full">
          <h1 className="text-3xl text-green-500  font-bold ">
            Client
          </h1>
        </div>
      </div> */}
      <Login/>
      
    </div>

  )
}

export default App
