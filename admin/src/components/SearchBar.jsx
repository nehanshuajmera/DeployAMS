import { useState } from "react";

const SearchBar = ({sortData, setSortData, type}) => {
    const listOfData = [...sortData]
    const [search, setSearch] = useState(null);
    const idType = {
        teacher:"teacher_id",
        student:"",
        subject:"",
    }

    const teacherCheck = (item)=> {
            if(item.name )
                return true
        return false
    }
    
    const searchFunc = (e)=>{
        setSearch(e.target.value)
        const resultOfSearch = listOfData.filter(item=>{
            // filter out content either have same name or id
            // return (item.name.toLowerCase.include(search.toLowerCase) || item.id.toLowerCase.include(search.toLowerCase))

            return item.name.toLowerCase.include(search.toLowerCase)
        })
        
        setSortData([...resultOfSearch])

    }


  return (
    <div>
        <div className="relative w-[300px] md:w-[400px]">
            <input type="text" name="search" id="search" className="inputBox border-[1px] border-gray-500 w-[300px] md:w-[400px] peer/search" 
            value={search}
            onChange={(e)=>searchFunc(e)}
            />
            {/* dropdown */}
            <div className="absolute w-full h-[170px] bg-[#FFFBF5] left-0 z-[100000] hidden peer-focus/search:block">
                <div className="flexCenter flex-col">
                    fdlex
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchBar
