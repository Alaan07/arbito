import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import '../Styles/Allblogs.css';

const blogscard = [
  {
    Thumbnail: '/img/braindemo.png',
    Title: 'The Brain of Ai bla bla bla',
    category: ['IT', 'world', 'tech'],
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel consectetur placeat non mollitia aliquam...',
  },
  {
    Thumbnail: '/img/braindemo.png',
    Title: 'The Brain of Ai bla bla bla',
    category: ['IT', 'tech'],
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel consectetur placeat non mollitia aliquam...',
  },
  {
    Thumbnail: '/img/braindemo.png',
    Title: 'The Brain of Ai bla bla bla',
    category: ['IT', 'ComputerScience', 'world'],
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel consectetur placeat non mollitia aliquam...',
  },
  {
    Thumbnail: '/img/braindemo.png',
    Title: 'The Brain of Ai bla bla bla',
    category: ['IT', 'ComputerScience'],
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel consectetur placeat non mollitia aliquam...',
  },
  {
    Thumbnail: '/img/braindemo.png',
    Title: 'The Brain of Ai bla bla bla',
    category: ['IT', 'ComputerScience', 'tech'],
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel consectetur placeat non mollitia aliquam...',
  },
  {
    Thumbnail: '/img/braindemo.png',
    Title: 'The Brain of Ai bla bla bla',
    category: ['IT', 'ComputerScience', 'tech'],
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel consectetur placeat non mollitia aliquam...',
  },
  {
    Thumbnail: '/img/braindemo.png',
    Title: 'The Brain of Ai bla bla bla',
    category: ['IT', 'ComputerScience', 'tech'],
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel consectetur placeat non mollitia aliquam...',
  },
  {
    Thumbnail: '/img/braindemo.png',
    Title: 'The Brain of Ai bla bla bla',
    category: ['IT', 'ComputerScience', 'tech'],
    description:
      'yhjjjjjjjbkuigkhggggyyyyyytbffffffffffffffffffffffffffffffffffffffffff6uyfffffffffffffffffmollialiquamgutjcjjjjjjjjjjjjjjjjjjhviyiyfffffhufyhvfyuvhjivhjugiiiiijkvdtsrxfhvjgvhhhhhhhhhhhhhhhhhhhhhhhhhhhhuhvgyfvhhvjjvhifyvhguuuuuuuuuuuuuuuuuuujhvghcfyhvghcfdtfygvcxsdrtuiyohlkkkkkkhjbhjgfhkkkkkkkkkkj...',
  },
];

function AllBlogs() {
  const [category, setCategory] = useState('latest');
  const [filterdis, setfilterdis] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleFilterToggle = () => {
    setfilterdis((prev) => !prev);
  };

  const filteredCards =
    category === 'latest'
      ? blogscard
      : blogscard.filter((card) => card.category.includes(category));

  return (
    <div className="wholeAllBlogcontainer">
      <div className="mainbodyallblog">
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
              <option value="ComputerScience">Computer science</option>
              <option value="tech">tech</option>
              <option value="world">world</option>
            </select>
            <span className="icofilterblog" onClick={handleFilterToggle}>
              <FaFilter />
            </span>
          </div>
        </div>

        <div className="allblogsCarddiv">
          <div className="allblogscardSection">
            {filteredCards.map((card, index) => (
              <div className="allblogcard" key={index}>
                <img src={card.Thumbnail} alt="Blog Thumbnail" className="blogcardimg" />
                <h3>{card.Title}</h3>
                <h4>
                  Category:{' '}
                  {card.category.map((cat, i) => (
                    <span
                      key={i}
                      className="blogcard-category-span"
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </span>
                  ))}
                </h4>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllBlogs;
