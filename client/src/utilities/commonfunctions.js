export const getAllCourses = async (setback,callback) => {
    try {
      const res = await fetch("/courses", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      });

      if (!res.status === 200) {
        throw new Error(res.error)
      }
      const data = await res.json();
      if(setback){
        setback([...data]);
      }
      
      if(callback){
        callback();
      }

    } catch (error) {
      console.log(error);
    }
}

export const getCartItems = async (setback,callback) => {
    try {
        const res = await fetch("/api/carts", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (!res.status === 200) {
            throw new Error(res.error)
        }
        const data = await res.json();
        if(setback){
            setback(data);
        }
        if(callback){
            callback();
        }
    } catch (error) {
        console.log(error);
    }
}

export const getEnrolledCourses = async (setback,callback) => {
  try {
    const res = await fetch("/api/enrolledcourses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    if (!res.status === 200) {
      throw new Error(res.error)
    }
    const data = await res.json();
    if(setback){
      setback(data);
    }
    
    if(callback){
      callback();
    }

  } catch (error) {
    console.log(error);
  }
}

export const getEnrolledCourseDetails = async (courseId,setback,callback) => {

  try {
      const res = await fetch("/api/enrolledcourse", {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            credentials: "include",
          body: JSON.stringify({
              courseId
            })
      });

      if (!res.status === 200) {
          throw new Error(res.error)
      }
      const data = await res.json();
      console.log(data);
      if(setback){
        setback({ ...data.courseId });
      }
      
      if(callback){
        callback(data);
      }
      

  } catch (error) {
      console.log(error);
  }

}

export const updateEnrolledCourseStatus = async (obj,callback) => {

  try {
      const res = await fetch("/api/updateenrolledcoursestatus", {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            credentials: "include",
          body: JSON.stringify({
              ...obj
            })
      });

      if (!res.status === 200) {
          throw new Error(res.error)
      }
      const data = await res.json();
      console.log(data);
      
      if(callback){
        callback(data);
      }
      

  } catch (error) {
      console.log(error);
  }

}

export const getInstructorCourses = async (callback) => {
  try {
      const res = await fetch("/instructor/courses", {
          method: "GET",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          credentials: "include"
      });

      if (!res.status === 200) {
          throw new Error(res.error)
      }
      const data = await res.json();
      callback(data);

  } catch (error) {
      console.log(error);
  }

}

export const getUserDetails = async (callback) => {
  try {
      const res = await fetch("/userdata", {
          method: "GET",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          credentials: "include"
      });

      if (!res.status === 200) {
          throw new Error(res.error)
      }
      const data = await res.json();
      callback(data);

  } catch (error) {
      console.log(error);
  }


}