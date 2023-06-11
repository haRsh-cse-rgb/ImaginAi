import React, { useState , useEffect } from 'react'
import Loader from '../components/Loader'
import Card from '../components/Card'
import Form from '../components/Form'

const RenderCards= ({data , title}) =>{
    if(data?.length > 0){
        return (
        data.map((post) =><Card key={post._id} {...post}/>)
        )
    }
    return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase>'>{title}</h2>
    )
}



const Home = () => {

    const [loading , setLoading]=useState(false);
    const [allPosts , setAllPosts]=useState(null);
    const [searchText , setSearchText]= useState('');
    const [searchResults , setSearchedResults]=useState(null);

    const [searchTimeOut , setSearchTimeOut]=useState(null)

    useEffect(() => {
      
    const fetchPosts = async () =>{
        setLoading(true)

        try {

            const response = await fetch('http://localhost:8000/api/v1/post' , {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                },
            })

            if(response.ok){
                const result = await response.json();

                setAllPosts(result.data.reverse());
            }
            
        } catch (error) {
            alert(error)
        }
        finally{
            setLoading(false);
        }
    }
     
    fetchPosts();
      
    }, [])

    const handleSearchChange =(e) =>{

        clearTimeout(searchTimeOut);
        setSearchText(e.target.value);

        setSearchTimeOut(
    
        setTimeout(() =>{
            const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase()))
    
            setSearchedResults(searchResults);
        } , 500));
    }
    

  return (
    <section max-w-7xl mx-auto>
    <div>
        <h1 className='font-extrabold text-[white] text-[32px]'> <span className='text-[#6449ff]'>Imagin AI</span> Community Showcase</h1>
        <p className='mt-2 text-[white] text-[16px] max-w[500px]'>This is a Imagin Ai community area . Browse through the collection of AI generated Images generated by Imagin AI.</p>
    </div>

    <div className="mt-16">
        <Form LabelName="Search Posts"
            type="text"
            name="text"
            placeholder="Search Posts"
            value={searchText}
            handleChange={handleSearchChange}

        />
    </div>

    <div className="mt-10">
        {
            loading ? (
                <div className="flex justify-center items-center">
                    <Loader/>
                </div>
            ):(
                <>
                    {searchText && (
                        <h2 className='font-medium text-[white] text-xl mb-3'>
                            Showing Results for <span className='text-[white]'>{searchText}</span>
                        </h2>
                    )}

                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                        {searchText ? (
                            <RenderCards
                            data={searchResults}
                            title="No Search results Found"
                            />
                        ):(
                            <RenderCards
                            data={allPosts}
                            title="No posts Found"/>
                        )
                        }
                    </div>
                </>
            )
        }
    </div>

    </section>
  )
}

export default Home