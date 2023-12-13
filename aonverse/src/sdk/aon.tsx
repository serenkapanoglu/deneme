/*import { chain } from "lodash";*/
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  dummySession,
  dummyFollows as initialDummyFollows,
  dummySupports as initialDummySupports,
  dummyPaymentMethods,
  dummyPolls,
  //dummyTrophies,
  dummyTransactions,
  dummyAvatarFrames,
  dummyTags as initialDummyTags,
} from "~/util/dummyContent";
import { immer } from "zustand/middleware/immer";
import axios from 'axios';



//these just allow the sdk to modify the array its pulling from
let dummyFollows = initialDummyFollows;
let dummySupports = initialDummySupports;
let dummyTags = initialDummyTags;

let dummyNetworkCallTimeout = 500;

type AonStore = {
  session: { user: UserData } | null; // Assuming CurrentUser is the type for your actual user data
  layout?: string;
};

export type AonState = {
  header: { momentum: "down" | "up" };
};

export class Aon {
  //zustand store
  //this can be used as a hook to cause render updates, but also changed by using aon.store.setState
  //also will automatically store this data in localStorage thanks to the presist middleware
  store = create(
    persist<AonStore>(
      () => ({
        session: null,
      }),
      { name: "aon-store" }
    )
  );

  state = create(immer<AonState>(() => ({ header: { momentum: "up" } })));

  signup = async (
    _data: { email: string, password: string, displayName: string, profimage: string, backprofimage: string } & { [key: string]: string | number }
  ) => {
    try {
      // Make an axios call to the authentication endpoint for signup
      await axios.post('http://localhost:8000/auth/signup', {
        email: _data.email,
        password: _data.password,
        displayName: _data.displayName,
        profimage: "/images/bd5a535b59626c97b45ad0d851e937cc",
        backimage: "/images/062a789423f6fe6e937f568ac9b73f76"
      });
  
    } catch (error) {
      // Handle authentication error
      console.error('Authentication error:', error);
      // You might want to show an error message to the user or handle the error in a specific way
    }
  };

  signin = async (
    _data: { email: string, password: string } & { [key: string]: string | number }
) => {
    try {
        // Make an axios call to the authentication endpoint
        const response = await axios.post('http://localhost:8000/auth/login', {
            email: _data.email,
            password: _data.password
        });

        // Assuming the response.data contains the session information
        const sessionData = response.data;

        // Update the session in the store with the data from the response
        this.store.setState({
            session: sessionData,
        });

        // Log the session data to the console
        console.log('Session:', sessionData);

        // Optionally, you may perform additional actions after successful authentication

    } catch (error) {
        // Handle authentication error
        console.error('Authentication error:', error);
        // You might want to show an error message to the user or handle the error in a specific way
    }
};

  signinWithProvider = async (_provider: string) => {
    //TODO: this should redirect the page to a providers oauth login with an aon callback url in the query params
    //for now i'm just setting the session here
    this.store.setState({
      session: dummySession,
    });
    //could also use the same flow to "sign UP with provider" too
  };

  signout = async () => {
    this.store.setState({ session: null });
  };

  getExploreFeed = async () => {
    try {
      // Simulate a network call using axios
      const response = await axios.get('http://localhost:8000/posts');

      // Wait for the network call to complete
      await new Promise((resolve) => setTimeout(resolve, dummyNetworkCallTimeout));

      // Sort the filtered posts by PostTime in descending order (most recent first)
      const sortedPosts = response.data.sort((a: PostData, b: PostData) => {
        // Assuming PostTime is a string in ISO format, adjust the parsing as needed
        const timeA = new Date(a.PostTime).getTime();
        const timeB = new Date(b.PostTime).getTime();
  
        return timeB - timeA;
       }); // Compare in descending order

        return sortedPosts;
    } catch (error) {
      console.error('Error fetching explore feed:', error);
      // Handle the error appropriately, e.g., throw it or return a default value
    }
  };

  getRankFeed = async () => {
    try {
      // Simulate a network call using axios
      const response = await axios.get('http://localhost:8000/crowns/rank/all?tagId=all');

      // Wait for the network call to complete
      await new Promise((resolve) => setTimeout(resolve, dummyNetworkCallTimeout));
  
      return response.data;

    } catch (error) {
      console.error('Error fetching explore feed:', error);
      // Handle the error appropriately, e.g., throw it or return a default value
    }
  };

  getMyProfileFeed = async (slug: string) => {
    try {
      // Simulate a network call using axios
      const response = await axios.get('http://localhost:8000/posts');
  
      // Wait for the network call to complete
      await new Promise((resolve) => setTimeout(resolve, dummyNetworkCallTimeout));
  
      // Filter posts based on the provided slug
      const filteredPosts = response.data.filter((post: PostData) => post.slug === slug);
  
      // Sort the filtered posts by PostTime in descending order (most recent first)
      const sortedPosts = filteredPosts.sort((a: PostData, b: PostData) => {
        // Assuming PostTime is a string in ISO format, adjust the parsing as needed
        const timeA = new Date(a.PostTime).getTime();
        const timeB = new Date(b.PostTime).getTime();
  
        return timeB - timeA; // Compare in descending order
      });
  
      console.log(response)
      return sortedPosts;
    } catch (error) {
      // Handle errors if the network call fails
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

  /*getProfileFeed = async (userId: string) => {
    //pretend network call
    await new Promise((resolve) =>
      setTimeout(resolve, dummyNetworkCallTimeout)
    );
    //pick 20 random posts
    return chain(dummyPosts)
      .filter((x) => x.user.id === userId)
      .orderBy(Math.random)
      .take(20)
      .value();
  };*/

  createPost = async (
    _data: { 
      user: string, 
      text: string, 
      slug: string,
      postimage: string,
      collaborator: string,
      category: string,
      nsfw: boolean,
      remix: boolean,
      profileImage: string,
      share: boolean,
      visibility: string,
      boost: boolean
     }
  ) => {
    try {
      // Make an axios call to the create post endpoint for signup
      await axios.post('http://localhost:8000/posts/', {
        user: _data.user,
        text: _data.text,
        slug: _data.slug,
        postimage: _data.postimage,
        collaborator: _data.collaborator,
        category: _data.category,
        nsfw: _data.nsfw,
        remix: _data.remix,
        profileImage: _data.profileImage,
        share: _data.share,
        visibility: _data.visibility,
        boost: _data.boost
      });
  
    } catch (error) {
      // Handle create post error
      console.error('Create Post:', error);
      // You might want to show an error message to the user or handle the error in a specific way
    }
  };

  /*getStarredPosts = async () => {
    //pretend network call
    await new Promise((resolve) =>
      setTimeout(resolve, dummyNetworkCallTimeout)
    );
    //pick 20 random posts
    return chain(dummyPosts).orderBy(Math.random).take(20).value();
  };*/

  /*getLikedPosts = async () => {
    //pretend network call
    await new Promise((resolve) =>
      setTimeout(resolve, dummyNetworkCallTimeout)
    );
    //pick 20 random posts
    return chain(dummyPosts).orderBy(Math.random).take(20).value();
  };*/

  getProfilePic =async (userId:string) => {
    
    try {
      // Simulate a network call using axios
      const response = await axios.get(`http://localhost:8000/img/${userId}`);

      // Wait for the network call to complete
      await new Promise((resolve) => setTimeout(resolve, dummyNetworkCallTimeout));
    
    response.data
  } catch (error) {
    console.error('Error fetching explore feed:', error);
    // Handle the error appropriately, e.g., throw it or return a default value
  }}

  getUser = async (userId: string) => {
    console.log(userId)
    try {
      // Simulate a network call using axios
      const response = await axios.get(`http://localhost:8000/users/${userId}`);

      // Wait for the network call to complete
      await new Promise((resolve) => setTimeout(resolve, dummyNetworkCallTimeout));
    
    return response.data
  
    } catch (error) {
      console.error('Error fetching explore feed:', error);
      // Handle the error appropriately, e.g., throw it or return a default value
    }}

  getUsers = async () => {
    try {
      // Simulate a network call using axios
      const response = await axios.get('http://localhost:8000/users');
  
      // Wait for the network call to complete
      await new Promise((resolve) => setTimeout(resolve, dummyNetworkCallTimeout));
  
      // Return the users from the response
      return response.data;
    } catch (error) {
      // Handle errors if the network call fails
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  getPost = async (postId: string) => {
    try {
      // Make an Axios request to your server
      const response = await axios.get(`http://localhost:8000/posts/modal/${postId}`);
  
      // Wait for the network call to complete
      await new Promise((resolve) => setTimeout(resolve, dummyNetworkCallTimeout));
  
      return response.data;
    } catch (error) {
      // Handle errors if the network call fails
      console.error('Error fetching post details:', error);
      throw error;
    }
  };

  getFollowedUsers = async () => {
    //pretend network call
    await new Promise((resolve) =>
      setTimeout(resolve, dummyNetworkCallTimeout)
    );
    //pick 20 random posts
    return dummyFollows;
  };

  unfollowUser = async (userId: string) => {
    //pretend network call
    await new Promise((resolve) =>
      setTimeout(resolve, dummyNetworkCallTimeout)
    );
    //
    dummyFollows = dummyFollows.filter(
      (support) => support.followed._id !== userId
    );
  };

  getSupportedUsers = async () => {
    //pretend network call
    await new Promise((resolve) =>
      setTimeout(resolve, dummyNetworkCallTimeout)
    );
    //pick 20 random posts
    return dummySupports;
  };

  unsupportUser = async (userId: string) => {
    //pretend network call
    await new Promise((resolve) =>
      setTimeout(resolve, dummyNetworkCallTimeout)
    );
    //
    dummySupports = dummySupports.filter(
      (support) => support.supported._id !== userId
    );
  };

  getPaymentMethods = async () => {
    //pretend network call
    await new Promise((resolve) =>
      setTimeout(resolve, dummyNetworkCallTimeout)
    );
    //
    return dummyPaymentMethods;
  };

  getTransactions = async () => {
    //pretend network call
    await new Promise((resolve) =>
      setTimeout(resolve, dummyNetworkCallTimeout)
    );

    return dummyTransactions;
  };

  getActivePolls = async () => {
    try {
      // Simulate a network call using axios
      const response = await axios.get('http://localhost:8000/voiting');

      // Wait for the network call to complete
      await new Promise((resolve) => setTimeout(resolve, dummyNetworkCallTimeout));

      // Log the results to the console
      const data = response.data;
      console.log('polls Feed Results:', data);
    return data;

} catch (error) {
  console.error('Error fetching explore feed:', error);
  // Handle the error appropriately, e.g., throw it or return a default value
}}

getActiveVotes = async () => {
  try {
    // Simulate a network call using axios
    const response = await axios.get('http://localhost:8000/votes');

    // Wait for the network call to complete
    await new Promise((resolve) => setTimeout(resolve, dummyNetworkCallTimeout));

    // Log the results to the console
    const data = response.data;
    console.log('votes Feed Results:', data);
  return data;

} catch (error) {
console.error('Error fetching explore feed:', error);
// Handle the error appropriately, e.g., throw it or return a default value
}}


getPollById = async (pollId:String) => {
  try {
    // Simulate a network call using axios to get a specific poll by ID
    const response = await axios.get(`http://localhost:8000/voiting/${pollId}`);

    // Wait for the network call to complete
    await new Promise((resolve) => setTimeout(resolve, dummyNetworkCallTimeout));

    // Log the results to the console
    const data = response.data;
    console.log('Poll by ID Results:', data);
    return data;
  } catch (error) {
    console.error('Error fetching poll by ID:', error);
    // Handle the error appropriately, e.g., throw it or return a default value
    return null;
  }
};


  getPreviousPolls = async () => {
    //pretend network call
    await new Promise((resolve) =>
      setTimeout(resolve, dummyNetworkCallTimeout)
    );

    return dummyPolls;
  };

  getAchievements = async () => {
    try {
      // Simulate a network call using axios
      const response = await axios.get('http://localhost:8000/crowns');

      // Wait for the network call to complete
      await new Promise((resolve) => setTimeout(resolve, dummyNetworkCallTimeout));

      // Log the results to the console
      const data = response.data;
      console.log('Explore Feed Results:', data);


      const dummyTrophies: TrophyData[] = data.map((item: { _id: any; image: any; crown: any; goal: any; title: any; description: any; progress: any; progressText: any; }) => ({
        id: item._id, // Access _id from each item
        image: item.image,
        crown: item.crown,
        goal: item.goal,
        title: item.title,
        description: item.description,
        progress: item.progress,
        progressText: item.progressText,
      }));
       console.log("datalog",dummyTrophies)

      return {
        avatarFrames: dummyAvatarFrames,
        displayCase: dummyTrophies.slice(0, 5),
        allTrophies: dummyTrophies,
      };
    } catch (error) {
      console.error('Error fetching explore feed:', error);
      // Handle the error appropriately, e.g., throw it or return a default value
    }
 };


 
 getTrophyById = async (id: string) => {
  if (!id) {
    return Promise.reject(new Error('Trophy ID is required'));
  }

  try {
    // Simulate a network call using axios
    const response = await axios.get(`http://localhost:8000/crowns/?id=' ${id}`);

    // Wait for the network call to complete
    await new Promise((resolve) => setTimeout(resolve, dummyNetworkCallTimeout));

    // Log the results to the console
    const data = response.data;
    
    const dummyTrophies: TrophyData[] = data
    .filter((item: { _id: string; }) => item._id === id)
    .map((item: { _id: any; image: any; crown: any; goal: any; title: any; description: any; progress: any; progressText: any; }) => ({
      id: item._id,
      image: item.image,
      crown: item.crown,
      goal: item.goal,
      title: item.title,
      description: item.description,
      progress: item.progress,
      progressText: item.progressText,
    }));
    return {
      Trophy: dummyTrophies,
    };
  } catch (error) {
    console.error('Error fetching explore feed:', error);
    // Handle the error appropriately, e.g., throw it or return a default value
    return Promise.reject(error);
  }
};


  getPreferences = async () => {
    //pretend network call
    await new Promise((resolve) =>
      setTimeout(resolve, dummyNetworkCallTimeout)
    );

    return {
      tags: dummyTags,
    };
  };

  removeTag = async (tag: string) => {
    //pretend network call
    await new Promise((resolve) =>
      setTimeout(resolve, dummyNetworkCallTimeout)
    );

    dummyTags = dummyTags.filter((x) => x !== tag);
  };

  //more app logic can go here, you can interect directly with this.store or this.state to update anywhere that uses the aon.store or aon.state hook
  //this.store will be saved to the browsers localdata
}
