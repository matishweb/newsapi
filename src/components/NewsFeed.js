import { useEffect, useState } from "react";
import axios from "axios";

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [clickedCategory,setclickedCategory] =useState(["Sports"]);
  const [activeCategory,setactiveCategory]=useState("Business");
  const [isLoading, setIsLoading] = useState(false);

  const passedCategory = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology"
  ];


const categoryMapping = () =>{
  setIsLoading(true);
axios({ 
  method: "GET",
  url: "https://newsapi.org/v2/top-headlines",
      params: {
        country: "in",
        apiKey: "fda017e8dde94fd5bf454c1830735548",
        category: clickedCategory
      }
    }).then((response)=>{
        setArticles(response.data.articles);
        console.log(response);
    }).catch((error)=>{
      console.log(error);
    }).finally(()=>{
      setIsLoading(false);
    })
   
  }

const OnclickCategaory = (categ) =>{
  //console.log(categ);
  setclickedCategory(categ);
  categoryMapping();
  
  setactiveCategory(categ);

}

  //Did mount
  useEffect(() => {
    categoryMapping();
  },[])
  return (
    <>
      {
        passedCategory.map((cat, index) => {
        return <button key={index} onClick = {()=>
          {OnclickCategaory(cat);} 
        } className={activeCategory == cat ? "active" : "unactive"}   >{cat}</button>;
      })
      }
      
      {isLoading ? (
        <p>Loading ...</p>
      ) : (

      <div id="artiDiv">
        {articles.map((article, index) => {
          return (
            <div className="card" id="cardid" style={{ width: "20rem" }}>
              <img
                className="card-img-top"
                id="cardimgid"
                src={article.urlToImage}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <a href={article.url} className="btn btn-primary">
                  Read more details{" "}
                </a>
              </div>
            </div>
          );
        })}
      </div>
      )}
      
    </>
  );
};

export default NewsFeed;
