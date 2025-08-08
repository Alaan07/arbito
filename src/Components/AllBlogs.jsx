import React, { useState, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';
import '../Styles/Allblogs.css';
import axios from '../api/axios.js';
import SEO from './SEO';

function AllBlogs() {
  const [blogscard, setblogscard] = useState([]);
  const [category, setCategory] = useState('latest');
  const [filterdis, setfilterdis] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/allblogs");
        setblogscard(res.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
  if (selectedBlog) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }

  return () => {
    document.body.classList.remove("modal-open");
  };
}, [selectedBlog]);

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleFilterToggle = () => setfilterdis((prev) => !prev);
  const filteredCards = category === 'latest'
    ? blogscard
    : blogscard.filter((card) => card.category.includes(category));

  return (
    <div className="wholeAllBlogcontainer">

      <SEO
        title="Arbito Blog - Insights, Stories & Student Projects"
        description="Read blogs from students, mentors, and the Arbito team on technology, careers, and community projects."
        url="https://yourdomain.com/blogs"
      />

      <div className={`mainbodyallblog ${selectedBlog ? 'blurred' : ''}`}>
        <div className="categoryallblogdiv">
          <div className="cateleftallbog">
            <span className="categoryh1">Blogs - </span>
            <span className="categoryblogspan">{category}</span>
          </div>
          <div className="categoryllblogfilter">
            <select
              name="filter"
              id="filter"
              className={`catfilselblog ${filterdis ? 'filterdison' : 'filterdisoff'}`}
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="latest">latest</option>
              <option value="IT">IT</option>
              <option value="CS">Computer Aplication</option>
              <option value="Tech">tech</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="cloud Computing">Cloud Computing</option>
            </select>
            <span className="icofilterblog" onClick={handleFilterToggle}>
              <FaFilter />
            </span>
          </div>
        </div>

        <div className="allblogsCarddiv">
          <div className="allblogscardSection">
            {filteredCards.map((card, index) => (
              <div className="allblogcard" key={index} onClick={() => setSelectedBlog(card)}>
                <img src={`${card.thumbnail}`} alt="Blog Thumbnail" className="blogcardimg" />
                {console.log(card.thumbnail)}
                <h3>{card.title}</h3>
                <h4>
                  Category:{' '}
                  {card.category.map((cat, i) => (
                    <span key={i} className="blogcard-category-span" onClick={(e) => {
                      e.stopPropagation(); // Prevent card open
                      setCategory(cat);
                    }}>
                      {cat}
                    </span>
                  ))}
                </h4>
                <p>{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedBlog && (
        <div className="blogModal">
          <button className="closeBtn" onClick={() => setSelectedBlog(null)}>✕</button>
          <img
            src={`${selectedBlog.thumbnail}`}
            alt="Full"
            className="modalImage"
          />
          <h2 className="blogmodelh2">{selectedBlog.title}</h2>
          <div className="modalCategories">
            {selectedBlog.category.map((cat, i) => (
              <span key={i} className="modalCatSpan">{cat}</span>
            ))}
          </div>
          <p className="modalIntro">{selectedBlog.intoduction}</p>
          <p className="modalDesc">{selectedBlog.content}</p>
        </div>
      )}
    </div>
  );
}

export default AllBlogs;
