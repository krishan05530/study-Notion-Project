import React from 'react'
import { useState } from 'react';
import { Chart,registerables }   from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);
const InstructorChart = ({courses}) => {
    const [currChart, setCurrChart] = useState('students') ;

    const getRandomColors=(numColors)=>{
        const colors=[];
        for(let i=0; i<numColors; i++){
            const color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
            colors.push(color);
        }
        return colors;
    }

    // create data fro chart desiplaying student info
    const chartDataForStudents={
        labels:courses.map((course)=>course.courseName),
        datasets:[
            {
                data:courses.map((course)=>course.totalStudentsEnrolled),
                backgroundColor:getRandomColors(courses.length),
            }
        ]
    }

    // create data for chart display income infor
const chartDataForIncome={
    labels:courses.map((course)=>course.courseName),
    // datasets:[
    //     {
    //         data:courses.map((course)=>course.totalAmountGenerated),
    //         backgroundColor:getRandomColors(courses.length),
    //     }
    // ]

        datasets: [
        {
            data: courses.map((course)=> course.totalAmountGenerated),
            backgroundColor: getRandomColors(courses.length),
        }
    ]
}


// const chartDataForIncome = {
//     labels:courses.map((course)=> course.courseName),
//     datasets: [
//         {
//             data: courses.map((course)=> course.totalAmountGenerated),
//             backgroundColor: getRandomColors(courses.length),
//         }
//     ]
// }
    //options create 
    const options={};

  return (
    <div>
   <p>Visulize</p>
   <div className='flex gap-x-5'>
    <button 
    onClick={()=>setCurrChart('students')}>
        students
    </button>
    <button 
    onClick={()=>setCurrChart('income')}>
        Income
    </button>

   </div>
   <div>
    <Pie
    data={currChart==='students'?chartDataForStudents:chartDataForIncome}
    options={options}
    />
   </div>
    </div>
  )
}

export default InstructorChart
