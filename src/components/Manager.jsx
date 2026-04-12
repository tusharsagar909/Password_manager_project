
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';
import { useRef, useState, useEffect } from 'react'

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPassword = async () =>{
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setpasswordArray(passwords)
        console.log(passwords)
    
    }

    useEffect(() => {
        getPassword()

    }, [])
    const copyText = (text) => {
        toast('🦄 Copy to clickboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
        });
        navigator.clipboard.writeText(text)

    }

    const Showpassword = () => {
        passwordref.current.type = "password"

        if (ref.current.src.includes("/icons/viewoff.png")) {

            ref.current.src = "/icons/view.png"
            passwordref.current.type = "text"
        }
        else {
            ref.current.src = "/icons/viewoff.png"
            passwordref.current.type = "password"

        }
    }



    const Savepassword = async() => {
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){

            // if any id exists in the db, delete it
           await fetch("http://localhost:3000/",{method:'DELETE',headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})

        setpasswordArray([...passwordArray, {...form, id:uuidv4()}])
         await fetch("http://localhost:3000/",{method:'POST',headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
        // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))

        // console.log([...passwordArray,form])
        setform({site:"",username:"",password:""})
          toast('🦄 password saved !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
        });
    }
    else{
        toast("ERROR: password not saved")
    }

    }
      const editPassword = (id) => {
        console.log("editing id =",id)
        setform({...passwordArray.filter(i=>i.id === id)[0],id:id})
        setpasswordArray(passwordArray.filter(item=>item.id !==id))

    }
      const DeletePassword = async(id) => {
       let c = confirm("Do you want to delete it !")
       if(c){

        setpasswordArray(passwordArray.filter(item=>item.id !==id))
        // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id !==id)))
        let res = await fetch("http://localhost:3000/",{method:'DELETE',headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})

          toast('🦄 Password Delete Sucessfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light", 
        });
    }
    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
       
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
               
            />

            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <div className="p-3 mycontainer rounded text-white min-h-[82vh] ">
                <h1 className='text-4xl font-bold text-center text-white'>

                    <span className='text-blue-700'>&lt;</span>
                    <span> Pass</span>
                    <span className='text-blue-700'>OP/&gt;</span>
                </h1>
                <p className='text-blue-700 text-lg text-center'>Your Own Password Manager</p>

                <div className=' text-white flex flex-col p-4 gap-8 items-center'>
                    <input value={form.site} type="text" placeholder='Enter website URL' onChange={handlechange} className='rounded-full border border-blue-500 w-full p-4 py-1 ' id='site' name='site' />
                    <div className='flex w-full justify-between gap-8 '>
                        <input value={form.username} type="text" placeholder='Enter Username ' onChange={handlechange} className="rounded-full border border-blue-500 w-full p-4 py-1" name='username' id='username' />
                        <div className="relative">

                            <input ref={passwordref} value={form.password} type="password" placeholder='Enter Password' onChange={handlechange} className="rounded-full border border-blue-500 w-full p-4 py-1 " name='password' id='password' />
                            <span className="absolute right-[1px]  top-[1px] cursor-pointer " onClick={Showpassword}>
                                <img ref={ref} className='p-1' src="/icons/viewoff.png" width={30} alt="" />
                            </span>
                        </div>

                    </div>
                    <button onClick={Savepassword} className='flex justify-center items-center gap-2 bg-violet-600 hover:bg-violet-400 rounded-full px-8 py-2 w-fit border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Save</button>

                </div>
                <div className="password">
                    <h2 className='font-bold text-2xl py-4'>Your Password</h2>
                    {passwordArray.length === 0 && <div> No password to show</div>}
                    {passwordArray.length != 0 && <div className='overflow-x-auto'>
                    <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-violet-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-violet-300 text-blue-900'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank'> {item.site} </a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2  border border-white text-center  '>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>

                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.password}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                     <td className='py-2 border border-white text-center'>
                                         <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                       <span className='cursor-pointer mx-1' onClick={()=>{DeletePassword(item.id)}}>
                                       <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                            </span>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Manager
