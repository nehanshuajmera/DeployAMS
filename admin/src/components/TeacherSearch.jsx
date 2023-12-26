import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { fetchdetailasync } from "../redux-toolkit/slices/fetchdetailslice";

const SubjectSearch = ({ teacher, changeTeacher }) => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState("");
  
  // console.log(`"selectedSubject" ${selectedSubject}`)
  // fetch all subjects 
  useEffect(() => {
    const unsub=async()=>{
      try{
        
        await dispatch(fetchdetailasync({apiname:"/allteachers"}));
        
      }catch(error){
          console.log(error);
      }
    }
    
    unsub();
  }, [])
  
  const allTeachersData = useSelector(state=>state.fetchDetail.details)  
  
  const [searchResult, setSearchResult] = useState([...allTeachersData]);



  const searchFunc = (e) => {
    setSearch(e.target.value);
    console.log(search);
    if (search === "") {
      setSearchResult([...allTeachersData]);
    } else {
      const resultOfSearch = searchResult.filter((item) => {
        console.log(item.subject_name.toLowerCase());
        // filter out content either have same name or id
        // return (item.name.toLowerCase.include(search.toLowerCase) || item.course_code.toLowerCase.include(search.toLowerCase))

        return item.subject_name.toLowerCase().includes(search.toLowerCase());
      });
      setSearchResult([...resultOfSearch]);
    }
  };

  // to set new result when allTeachersData changes
  useEffect(() => {
    setSearchResult([...allTeachersData]);
  }, [allTeachersData]);

  //   update dropdown list on every search and on update of allTeachersData collection
  useEffect(() => {
    (() => {
      if (search === "") {
        setSearchResult([...allTeachersData]);
      } else {
        const resultOfSearch = searchResult.filter((item) => {
          console.log(item.subject_name.toLowerCase());
          // filter out content either have same name or id
          // return (item.name.toLowerCase.include(search.toLowerCase) || item.course_code.toLowerCase.include(search.toLowerCase))

          return item.subject_name.toLowerCase().includes(search.toLowerCase());
        });
        setSearchResult([...resultOfSearch]);
      }
    })();
  }, [search, allTeachersData]);

  //   change selectedSubject state on change of subjects array
  // useEffect(() => {
  //   setSelectedSubject(subjects);
  // }, [subjects]);
 


  return (
    <div className="flex flex-col gap-3 col-span-2  ">
      <div className="relative w-[300px] md:w-[400px]">
        <select
          // type="text"
          name="search"
          id="search"
          className="inputBox border-[1px] border-gray-500 w-[300px] md:w-[400px] peer/search"
          // value={search}
          onChange={(e) => addSubject(e.target.value)}
        >
        {/* dropdown */}
        {/* <div className="absolute w-full h-[95px] bg-[#FFFBF5] left-0  hidden peer-focus/search:block peer-active/search:block"> */}
          {/* <div className="flexStart flex-col"> */}
          <option value={null}>Add new Subject</option>
            {searchResult.map((data) => {
              return (
                <option
                  key={data._id}
                  className="text-black cursor-pointer"
                  value={data._id}
                  // onClick={() => addSubject(data._id)}
                  // onSelect={() => addSubject(data._id)}
                  // onSelect={() => console.log(data._id)}
                >
                  {data.subject_name} - {data.course_code}
                </option>
              );
            })}
          {/* </div> */}
        {/* </div> */}
        </select>
      </div>
      {/* list of selected subject */}
      <div className="flex gap-3 flex-wrap mt-[100px] w-[300px] md:w-[400px]">
        <table className="flexCenter flex-col">
          <tHead>
            <tr className="grid grid-cols-6">
              <th className="col-span-3 text-center">Subject Name</th>
              <th className="col-span-2 text-center">Course Code</th>
              <th className="col-span-1 text-center">Remove</th>
            </tr>
          </tHead>
          <tbody>
            {selectedSubject.length === 0 ? (
              <p className="">No Selected subject</p>
            ) : (
              selectedSubject.map((subject) => {
                return (
                  <tr key={subject.id} className="grid grid-cols-6">
                    <td className="col-span-3 text-center">{subject.subject_name}</td>
                    <td className="col-span-2 text-center">
                      {subject.course_code}
                    </td>
                    <td
                      className="col-span-1 text-center right-2 text-3xl flexCenter cursor-pointer"
                      onClick={() => removeSubject(subject._id)}
                    >
                      <IoIosClose />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

          {selectedSubject.map((subject) => (
            <SubjectCollection
              key={subject.id}
              subject={subject}
              removeSubject={removeSubject}
            />
          ))}
        </table>
      </div>
    </div>
  );
};

const SubjectCollection = ({ subject, removeSubject }) => {
  return (
    <div className="bg-primary relative text-white pl-3 py-2 rounded-3xl flex justify-between items-center gap-1">
      <p>{subject.name}</p>
      <div
        className=" right-2 text-3xl flexCenter cursor-pointer"
        onClick={() => removeSubject(subject.id)}
      >
        <IoIosClose />
      </div>
    </div>
  );
};

export default SubjectSearch;
