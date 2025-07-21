import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)


  // analyse the changes in the todos and updates to localStorage
  useEffect(() => {
    if (todos.length !== 0) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos])


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])


  // const saveToLS = () => {
  //   localStorage.setItem("todos", JSON.stringify(todos))
  // }

  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }
  

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("");
    // saveToLS()

  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter((item) => {
      return item.id !== id
    });

    setTodos(newTodos)
    // saveToLS()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id
    });
    setTodos(newTodos)
    // saveToLS()
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    // saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  return (
    <>
      <Navbar />
      <div className="md:my-10 m-3 md:container md:m-auto rounded-2xl md:w-[35%] py-3 md:px-10 px-5 min-h-[80vh] bg-gradient-to-r from-violet-100 to-indigo-100">

        <h1 className='text-2xl font-bold text-center border-b-2 mb-7 md:mx-10 p-2'>My Tasks - your personal Todo app</h1>
        <div className="addTodo my-5 flex flex-col gap-5">
          <h2 className='text-xl font-bold'>Add Your Todo</h2>
          <div className="flex gap-3">
            <input onChange={handleChange} value={todo} placeholder='Start writing here' type="text" className='bg-white w-full outline-0 px-4 rounded-full' />
            <button onClick={handleAdd} disabled={todo.length < 3} className='bg-violet-600 disabled:bg-violet-400 hover:bg-violet-900 p-6 font-bold py-2 text-white rounded-full'>Add</button>
          </div>
        </div>
        <input className='my-4 mb-2' onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" /> Show Finished
        <div className="h-[1px] bg-black w-1/2 mb-4"></div>
        <h2 className='text-xl font-semibold'>Your Todos</h2>
        <div className="todos my-2">
          {todos.length == 0 && <div>No todos to show....</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between w-full mb-2">
              <div className='flex gap-4 items-center '>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={!item.isCompleted ? "" : "line-through"} >{item.todo}</div>
              </div>
              <div className="buttons">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="edit mx-2 bg-violet-600 hover:bg-violet-900 p-4 font-bold py-2 text-white rounded-md"><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="delete mx-2 bg-violet-600 hover:bg-violet-900 p-4 font-bold py-2 text-white rounded-md"><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
