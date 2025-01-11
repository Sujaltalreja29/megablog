import React, { useEffect } from "react";
import appwriteService from "../appwrite/configuration";
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/postSlice";


function Home() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.posts); // Access posts directly from Redux store
    const authStatus = useSelector((state) => state.auth.status)
    

    useEffect(() => {
        if (!posts || posts.length === 0) {
            appwriteService.getPosts().then((response) => {
                if (response && response.documents) {
                    const postsToDispatch = response.documents.map((post) => ({
                        $id: post.$id,
                        title: post.title,
                        featuredImage: post.featuredImage,
                        userId: post.userId
                    }));
                    dispatch(getPosts(postsToDispatch)); // Dispatch action with al
                }
            });
        }
    }, [dispatch, posts]); // Add dependencies to ensure effect runs when needed

    if (!posts || posts.length === 0) {
        if(!authStatus){
            return (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    Login to read posts
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            );
        }else{
            return (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    No posts available
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            );
        }
    }   

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div> 
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
