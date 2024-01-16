import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { fetchdetailasync } from "../redux-toolkit/slices/fetchdetailslice";

const SubjectSearchStud = ({ subjects, changeSubjectList }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [detailsofSelectedSubject, setDetailsofSelectedSubject] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([...subjects]);
  console.log(selectedSubject);

  // fetch all subjects
  useEffect(() => {
    const unsub = async () => {
      try {
        await dispatch(fetchdetailasync({ apiname: "/allsubjects" }));
      } catch (error) {
        console.log(error);
      }
    };

    unsub();
  }, []);

  const allSubjectData = useSelector((state) => state.fetchDetail.details);
  const [searchResult, setSearchResult] = useState([...allSubjectData]);

  //   add subject
  const addSubject = (sub_id) => {
    // check if subject is already in the Selected Array
    if (detailsofSelectedSubject.find((ele) => ele._id === sub_id)) {
      return;
    }
    // add new Subject
    setSelectedSubject((prev) => [
      ...prev,
      { subject_id: sub_id},
    ]);
  };

  // remove subject
  const removeSubject = (sub_id) => {
    const newList = selectedSubject.filter(
      (subject) => subject.subject_id !== sub_id
    );
    setSelectedSubject(newList);
  };

  // search function
  const searchFunc = (e) => {
    setSearch(e.target.value);
    console.log(search);
    if (search === "") {
      setSearchResult([...allSubjectData]);
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

  // to set new result when allSubjectData changes
  useEffect(() => {
    setSearchResult([...allSubjectData]);
  }, [allSubjectData]);

  //   update dropdown list on every search and on update of allSubjectData collection
  useEffect(() => {
    (() => {
      if (search === "") {
        setSearchResult([...allSubjectData]);
      } else {
        const resultOfSearch = searchResult.filter((item) => {
          // console.log(item.subject_name.toLowerCase());
          // filter out content either have same name or id
          // return (item.name.toLowerCase.include(search.toLowerCase) || item.course_code.toLowerCase.include(search.toLowerCase))

          return item.subject_name.toLowerCase().includes(search.toLowerCase());
        });
        setSearchResult([...resultOfSearch]);
      }
    })();
  }, [search, allSubjectData]);

  //   change detailsofSelectedSubject state on change of subjects array
  useEffect(() => {
    let temp = allSubjectData.filter((subj) => {
      let obj = selectedSubject.find((elem) => elem.subject_id == subj._id);
      if (obj) {
        console.log(obj);
        return {
          ...obj,
          ...subj,
          // permission: obj.permission
        };
      } else return;
    });
    console.log("temp, ", temp);
    temp = temp.map((sub) => {
      let obj = selectedSubject.find((elem) => elem.subject_id == sub._id);
      if (obj) {
        console.log(obj);
        return {
          ...obj,
          ...sub,
          // permission: obj.permission
        };
      }
      // return { ...sub, permission: "write" };
    });
    setDetailsofSelectedSubject(temp);
    // console.log(detailsofSelectedSubject)
  }, [allSubjectData, selectedSubject]);

  //   change the of subjects array
  useEffect(() => {
    // console.log(selectedSubject)
    changeSubjectList([...selectedSubject]);
  }, [selectedSubject]);

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
        <table className="flexCenter flex-col py-2 px-2 border grid grid-cols-11">
          <thead className="col-span-11">
            <tr className="py-2 px-2 border grid grid-cols-11">
              <th className="py-2 px-2 border col-span-5 text-center">
                Subject Name
              </th>
              <th className="py-2 px-2 border col-span-4 text-center">
                Course Code
              </th>              
              <th className="py-2 px-2 border col-span-2 text-center">
                Remove
              </th>
            </tr>
          </thead>
          <tbody className="col-span-11">
            {detailsofSelectedSubject.length === 0 ? (
              <p className="">No Selected subject</p>
            ) : (
              detailsofSelectedSubject.map((subject) => {
                // console.log(subject)
                return (
                  <tr
                    key={subject._id}
                    className="py-2 px-2 border grid grid-cols-11"
                  >
                    <td className="py-2 px-2 border col-span-5 text-center">
                      {subject.subject_name}
                    </td>
                    <td className="py-2 px-2 border col-span-4 text-center">
                      {subject.course_code}
                    </td>                    
                    <td
                      className="py-2 px-2 border col-span-2 text-center right-2 text-3xl flexCenter cursor-pointer"
                      onClick={() => removeSubject(subject._id)}
                    >
                      <IoIosClose />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectSearchStud;
