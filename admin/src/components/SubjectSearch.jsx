import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";

const SubjectSearch = ({ subjects, changeSubjectList }) => {
  const subjectData = useSelector((state) => state.fetchDetail.details);
  console.log(subjectData);
  const [searchResult, setSearchResult] = useState([...subjectData]);
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(subjects);

  //   add subject
  const addSubject = (id) => {
    const index = searchResult.findIndex((e) => e.id === id);
    const newSub = subjectData[index];
    setSelectedSubject((prev) => {
      prev.push(newSub);
    });
    changeSubjectList([...selectedSubject]);
  };

  // remove subject
  const removeSubject = (id) => {
    const newList = selectedSubject.filter((subject) => {
      return subject.id != id;
    });
    setSelectedSubject(newList);
  };

  const searchFunc = (e) => {
    setSearch(e.target.value);
    console.log(search);
    if (search === "") {
      setSearchResult([...subjectData]);
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

  // to set new result when subjectData changes
  useEffect(() => {
    setSearchResult([...subjectData]);
    console.log("useEffect");
  }, [subjectData]);

  //   update dropdown list on every search and on update of subjectData collection
  useEffect(() => {
    (() => {
      if (search === "") {
        setSearchResult([...subjectData]);
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
  }, [search, subjectData]);

  //   change selectedSubject state on change of subjects array
  useEffect(() => {
    setSelectedSubject(subjects);
  }, [subjects]);

  return (
    <div className="flex flex-col gap-3 col-span-2  ">
      <div className="relative w-[300px] md:w-[400px]">
        <input
          type="text"
          name="search"
          id="search"
          className="inputBox border-[1px] border-gray-500 w-[300px] md:w-[400px] peer/search"
          value={search || ""}
          onChange={(e) => searchFunc(e)}
        />
        {/* dropdown */}
        <div className="absolute w-full h-[95px] bg-[#FFFBF5] left-0  hidden peer-focus/search:block">
          <div className="flexStart flex-col">
            {searchResult.map((data) => {
              console.log(data.subject_name);
              return (
                <div
                  key={data._id}
                  className="text-black "
                  onClick={() => addSubject(data._id)}
                >
                  {data.subject_name}
                </div>
              );
            })}
          </div>
        </div>
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
                    <td className="col-span-3 text-center">{subject.name}</td>
                    <td className="col-span-2 text-center">
                      {subject.courseCode}
                    </td>
                    <td
                      className="col-span-1 text-center right-2 text-3xl flexCenter cursor-pointer"
                      onClick={() => removeSubject(subject.id)}
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
