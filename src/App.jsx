import './App.css'
import TasksContainer from './Components/TasksContainer/TasksContainer'

function App() {

  
  return (
    <>
      <div className='w-[98vw] overflow-hidden bg-[] flex  items-center justify-center mt-3'>
        <div className="task-list gap-5 flex m-2 p-2 border w-[97vw] overflow-auto shadow-xl">


          


          <TasksContainer taskStaus="Incomplete" indicatorcolor={'#e44545'}></TasksContainer>


          <TasksContainer taskStaus="ToDo"  indicatorcolor={'#4388d0'}></TasksContainer>
       
     
          <TasksContainer taskStaus="Doing"  indicatorcolor={'#FDDA0D'}></TasksContainer>
       
       
          <TasksContainer taskStaus="Completed"  indicatorcolor={'#4388d0'}></TasksContainer>
        
        
          <TasksContainer taskStaus="UnderReview"  indicatorcolor={'#4388d0'}></TasksContainer>

        </div>
      </div >
    </>
  )
}

export default App
