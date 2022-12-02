const Header = ({ courseName }) => {
    return (
      <h1>
        {courseName}
      </h1>
    )
  }
  
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  
  const Content = ({ parts }) => {
    return (
      parts.map(
        part => <Part key={part.id} part={part} />)
    )
  }
  
  
  const Total = ({ parts }) => {
    let total = parts.reduce(
      (acc, part) => part.exercises + acc, 0)
    return (
      <p>
        Number of exercises {total}
      </p>
    )
  }
  
  
  const Course = ({ course }) => {
    return (
      <>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }

export default Course