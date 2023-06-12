import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils/utils'


import Loader2 from '../components/Loader2'
import Form from '../components/Form'


const CreatePost = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    })


    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (form.prompt && form.photo) {
          setLoading(true);
          try {
            const response = await fetch('https://imaginai-9zxj.onrender.com/api/v1/post', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ...form }),
            });
    
            await response.json();
            alert('Success');
            navigate('/');
          } catch (err) {
            alert(err);
          } finally {
            setLoading(false);
          }
        } else {
          alert('Please generate an image with proper details');
        }
      };

    const handleChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value });

    }

    const handleSurpriseMe = () => {

        const randomPromt = getRandomPrompt(form.prompt);

        setForm({ ...form, prompt: randomPromt })
    }

    const generateImage = async () => {

        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch("https://imaginai-9zxj.onrender.com/api/v1/imaginai", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: form.prompt }),
                })

                const data = await response.json()
                console.log(data)

                setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })

            }
            catch (error) {

                alert(error)
                console.log(error)

            }
            finally {
                setGeneratingImg(false);
            }
        }
        else {
            alert("Please Enter valid Prompt");

        }

    }

    return (

        <section max-w-7xl mx-auto>
            <div>
                <h1 className='font-extrabold text-[white] text-[32px]'> Create With <span className='text-[#6449ff]'>Imagin AI </span></h1>
                <p className='mt-2 text-[white] text-[16px] max-w[500px]'>Convert your imaginative and creative visulas into pictures using Imagin AI.</p>
            </div>

            <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                    <Form
                        LabelName="Your Name"
                        type="text"
                        name="name"
                        placeholder="Eg: Harsh"
                        value={form.name}
                        handleChange={handleChange}
                    />

                    <Form
                        LabelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder="Eg: Underwater city"
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />

                    <div className="relative bg-[#202123] border border-white text-white text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 w-80
                      flex justify-center items-center">

                        {form.photo ? (
                            <img src={form.photo}
                                alt={form.prompt}
                                className="w-full h-full object-contain" />
                        ) : (
                            <img src={preview}
                                alt='preview'
                                className='w-9/12 h-9/12 object-contain opacity-100 filter-invert(1)' />
                        )}

                        {generatingImg && (
                            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgb(32,33,35)] rounded-lg">
                                <Loader2 />
                            </div>


                        )}

                    </div>

                </div>

                <div className="mt-5 flex gap-5">
                    <button
                        type="button"
                        onClick={generateImage}
                        className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">

                        {generatingImg ? 'Generating...' : 'Generate'}

                    </button>
                </div>

                <div className="mt-10">
                    <p className="mt-2 text-[white] text-[14px]">Click on Share with community button to showcase your creativity to community.</p>

                    <button type='submit'
                        className='mt-3 text-white bg-[#6449ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>Share with the community</button>


                </div>
            </form>
        </section>
    )
}

export default CreatePost