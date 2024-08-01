import { useState ,useEffect} from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished,SetShowFinished] = useState(true)

  useEffect(() => {
    let notEmpty = localStorage.getItem("todos");
    if(notEmpty){
      let newTodos= JSON.parse(localStorage.getItem("todos"));
      setTodos(newTodos)
    }
  }, [])
  
  const inputEnter=(e)=>{
      setTodo(e.target.value)
  }
  const saveClick = (e)=> {
    if (todo != ""){
      setTodos([...todos , {id:uuidv4(), todo , isComplete:false}])
      setTodo("")
      localStorage.setItem("todos",JSON.stringify([...todos , {id:uuidv4(), todo , isComplete:false}]))
    }
  }
  const editClick = (e,id)=>{
    let t = todos.filter((item)=>{
      return item.id === id
    })
    setTodo(t[0].todo)

    let newTodos = todos.filter(item=>{
      return item.id !=id
    })
    setTodos(newTodos);
    localStorage.setItem("todos",JSON.stringify(newTodos))

  }
  const deleteClick = (e,id)=>{
      let newTodos = todos.filter(item=>{
        return item.id !=id
      })
      setTodos(newTodos);
      localStorage.setItem("todos",JSON.stringify(newTodos))
  }
  const checkClicked = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex((item)=>{
      return item.id === id
    })
    let newTodos = [...todos];
    newTodos[index].isComplete=!newTodos[index].isComplete;
    setTodos(newTodos);
    localStorage.setItem("todos",JSON.stringify(newTodos))
  }
    const toggleFinished = ()=>{
      SetShowFinished(!showFinished);
    }
  return (
    <>
      <div className=' w-[88%] container bg-purple-300 m-auto my-10 xl:w-[35%] p-3 flex gap-4 flex-col h-[85vh] rounded-xl '>
        <h1 className='md:text-xl font-semibold text-center'>iTask - Manage your Todo at one place</h1>
        <div className='flex gap-2 justify-center'>
          <input className="w-[70%] rounded-md px-2" type="text" placeholder='Enter your todo' value={todo} onChange={inputEnter}/>
          <button className='bg-purple-600 rounded-md p-1 px-3' onClick={saveClick}>save</button>
        </div>
        <div className='text-l font-normal'><input type="checkbox" onChange={toggleFinished} checked={showFinished} />show finished</div>
        <h2 className='text-xl font-medium'>Your Todos</h2>
        <div className='bg-black h-[1px]'></div>
        {todos.length===0 && <div>No todos to display</div>}
        {todos.map((item)=>{
          return (showFinished || !item.isComplete) && <div className="overflow-y-auto" key={item.id}>
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <input type="checkbox" name={item.id} onChange={checkClicked} checked={item.isComplete}/>
              <p className={(item.isComplete)?'line-through':""}>{item.todo}</p>
            </div>
            <div className='flex gap-2'>
              <button onClick={(e)=>{editClick(e,item.id)}}><FaEdit /></button>
              <button onClick={(e)=>{deleteClick(e,item.id)}}><MdDelete /></button>
            </div>
          </div>
        </div>
        })}
      </div>
    </>
  )
}

export default App
