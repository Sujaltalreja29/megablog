import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import { useSelector,useDispatch } from 'react-redux';
import appwriteService from "../appwrite/configuration";
import authService from '../appwrite/auth';
import { Query } from 'appwrite';
import { login } from '../store/authSlice';
function AllPosts() {
    const poster = useSelector((state) => (state.post.posts))
    const userData = useSelector((state) => state.auth.userData)
    console.log(userData);
    const dispatch = useDispatch()
    // useEffect(() => {
    //     if (!poster || poster.length === 0) {
    //         appwriteService.getPosts().then((fetchedPosts) => {
    //             if (fetchedPosts) {
    //                 setPosts(fetchedPosts.documents);
    //             }
    //         });
    //     } else {
    //         setPosts(poster);
    //     }
    // }, [poster]);;
      
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {poster.map((post) => (
                    (post.userId === userData?.$id) ?
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div> : 
                    null
                ))}
                
            </div>
            </Container>
    </div>
  )
}

export default AllPosts