import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [name, setname] = useState('');
  const [age, setage] = useState(0);
  const [tags, settags] = useState('');

  const [GameName, setGameName] = useState('');
  const [platforms, setPlatforms] = useState('');
  const [developer, setDeveloper] = useState('');
  const [Price, setPrice] = useState(0);

  const [GameInfo, setGameInfo] = useState([])
  const [userList, setuserList] = useState([]);
  const [newtags, setNewtags] = useState('');
  const [newage, setNewage] = useState(0);
  const [advance, setadvanceList] = useState([]);


  // TODO
  const [GameHistory, setGameHistory] = useState([]);
  const [TagHistory, setTagHistory] = useState([]);
  const [AgeHistory, setAgeHistory] = useState([]);



  useEffect(() => {
    Axios.get('http://localhost:3002/api/getadvance').then((response) => {
      setadvanceList(response.data)
    })
    Axios.get('http://localhost:3002/api/get').then((response) => {
      setuserList(response.data)
    })
    // TODO
    Axios.get('http://localhost:3002/api/GameHistory').then((response) => {
      setGameHistory(response.data)
    })
    Axios.get('http://localhost:3002/api/TagHistory').then((response) => {
      setTagHistory(response.data)
    })
    Axios.get('http://localhost:3002/api/AgeHistory').then((response) => {
      setAgeHistory(response.data)
    })
  },[])

  const insert = () => {
    Axios.post('http://localhost:3002/api/insert', {
      name: name,
      age: age,
      tags: tags
    });

    setuserList([
      ...userList,
      {
        name: name,
        age:age,
        tags: tags
      },
    ]);
  };

  const search = () => {
    Axios.post(`http://localhost:3002/api/search`, {
      GameName:GameName
    }).then((response) => {
      setGameInfo(response.data);
    });
    setGameInfo([
      ...GameInfo,
      {
        GameName:GameName,
        platforms:platforms,
        developer:developer,
        Price:Price
      }
    ])
  }
  const Store_Procedure =() => {
    Axios.post('http://localhost:3002/api/sp');
  };

  // /${name}
  const deleteUser = (dename, inage, intag) => {
    Axios.delete(`http://localhost:3002/api/delete`,
    { data:{
      name:dename,
      age:inage,
      tag:intag
    }});
  };

  const updatetags = (name, age) => {
    Axios.put(`http://localhost:3002/api/update`, {
      name: name,
      tags: newtags,
      age: age,
      oldtag: tags
    });
    setNewtags("")
  };

  return (
    <div className="App">
      <div className='searchbox'>
        <label>Search Box</label>
        <input type='text' GameName = 'GameName' onChange={(e)=>{setGameName(e.target.value)}}/>
        <button onClick={search}>Search</button>
        {
          GameInfo.map((val) => {
            return (
              <div className = "card">
                <h1>GameName: {val.GameName}</h1>
                <p>platform:{val.platforms}</p>
                <p>developer:{val.developer}</p>
                <p>Price:{val.Price}</p>
              </div>
            );
          })
        }
      </div>

      <div className="form">
        <label>  Name:</label>
        <input type="text" name="name" onChange={(e) => {
          setname(e.target.value)
        } }/>

        <label> age:</label>
        <input type="text" age="age" onChange={(e) => {
          setage(e.target.value)
        }}/>

        <label> tags:</label>
        <input type="text" tags="tags" onChange={(e) => {
          settags(e.target.value)
        }}/>

        <button onClick={insert}> Insert</button>

        {userList.map((val) => {
          return (
            <div className = "card">
              <h1> name: {val.name} </h1>
              <p> age: {val.age}</p>
              <p> tags: {val.tags}</p>
              <button onClick={() => {
                deleteUser(val.name,val.age,val.tags) }}> Delete</button>
              <input type="text" id="updateInput" onChange={(e) => {
                settags(val.tags);
                setNewtags(e.target.value)
              } }/>
              <button onClick={() => {
                updatetags(val.name, val.age)
              }}> Update</button>
              </div>
          );

          ;
        })}


        {advance.map((val) => {
          return (
            <div className = "card">
              <h1> tags: {val.tags} </h1>
              <p> Game Name: {val.gname}</p>
              <p> Positive ratings: {val.pr}</p>
              </div>
          );

          ;
        })}

      </div>
      

      {/* TODO */}
      
      <div className='history'>
      <button onClick={Store_Procedure}>Store_Procedure</button>
      <label>GameHistory</label>
        {
          GameHistory.map((val) => {
            return (
              <div className = "card">
                <p> Search Game: {val.Game}</p>
                <p> Search Freq: {val.Num}</p>
                <p> Rating: {val.Rating}</p>
                <p> Achievements: {val.Achievements}</p>
              </div>
            );
          })
        }

        <label>TagHistory</label>
        {
          TagHistory.map((val) => {
            return (
              <div className = "card">
                <p> Search Tag: {val.Tag}</p>
                <p> Search Freq: {val.Search_frequent}</p>
                <p> Game Number: {val.Game_Num}</p>
              </div>
            );
          })
        }
        <label>AgeHistory</label>
        {
          AgeHistory.map((val) => {
            return (
              <div className = "card">
                <p> Search Age: {val.Age}</p>
                <p> Search Freq: {val.Freq}</p>
                <p> Game recommendNum: {val.recommendNum}</p>
              </div>
            );
          })
        }
      </div>


    </div>


    
  );



  
}

export default App;



// import './App.css';
// import React, {useState, useEffect} from "react";
// import Axios from 'axios';

// function App() {
//   const [name, setname] = useState('');
//   const [genre, setgenre] = useState('');
//   const [userlist, setuserlist] = useState([]);
//   const [newgenres, setnewgenres] = useState("");
//   const [gname, setgname] = useState('');

//   useEffect(() => {
//     Axios.get('http://localhost:3002/api/get').then((response) => {
//       setuserlist(response.data)
//     })
//   },[])

//   const submitgenre = () => { 
//     Axios.post('http://localhost:3002/api/insert', {
//       name: name,
//       genres: genre,
//       gname:gname
//     });
    
//     setuserlist([
//       ...userlist,
//       {
//         name: name,
//         genres: genre,
//         gname: gname
//       },
//     ]);
//   };

//   const deletegenre = (name) => {
//     Axios.delete(`http://localhost:3002/api/delete/${name}`);
//   };


//   const updategenre = (name) => {
//     Axios.put(`http://localhost:3002/api/update`, {
//       name: name,
//       genres: newgenres
//     });
//     setnewgenres("")
//   };

//   return (
//     <div className="App">
//       <h1> Steamit - game recommendation </h1>

//       <div className="form">
//         <label> User Name:</label>
//         <input type="text" name="name" onChange={(e) => {
//           setname(e.target.value)
//         } }/>
//         <label> genre:</label>
//         <input type="text" name="genre" onChange={(e) => {
//           setgenre(e.target.value)
//           setgname("none")
//         }}/>
        
      

//         <button onClick={submitgenre}> Submit</button>

//         {userlist.map((val) => {
//           return (
//             <div className = "card">
//               <h1> name: {val.name} </h1>
//               <p> genre: {val.genres}</p>
//               <p> game name: {val.gname}</p>
//               <button onClick={() => { deletegenre(val.name) }}> Delete</button>
//               <input type="text" id="updateInput" onChange={(e) => {
//                 setnewgenres(e.target.value)
//               } }/>
//               <button onClick={() => {
//                 updategenre(val.name)
//               }}> Update</button>
//               </div>
//           );
          
//           ;
//         })}
        

//       </div>
      
//     </div>
//   );
// }

// export default App;