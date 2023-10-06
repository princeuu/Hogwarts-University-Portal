import React, { useState , useEffect  } from 'react';
import NavigationButtons from '../components/NavigationButtons';
import '../styles/Announcements.css';


function Announcements({ setCurrentPage, userRole, userId }) { 

  // State variables for controlling the expansion of each announcement
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  const [isExpanded3, setIsExpanded3] = useState(false);
  const [isExpanded4, setIsExpanded4] = useState(false);
  const [isExpanded5, setIsExpanded5] = useState(false);
  const [isExpanded6, setIsExpanded6] = useState(false);

  const [announcements, setAnnouncements] = useState(() => {
    const storedAnnouncements = localStorage.getItem('announcements');
    return storedAnnouncements ? JSON.parse(storedAnnouncements) : [];
  });

  const [setNewAnnouncement] = useState({ title: '', content: '' });

  useEffect(() => {
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }, [announcements]);

  

  const handleExpandClick = (announcementIndex) => { // Function for expanding or collapsing an announcement
    if (announcementIndex === 1) {
      setIsExpanded1(!isExpanded1);
    } else if (announcementIndex === 2) {
      setIsExpanded2(!isExpanded2);
    }else if (announcementIndex === 3) {
      setIsExpanded3(!isExpanded3);
    }else if (announcementIndex === 4) {
      setIsExpanded4(!isExpanded4);
    }else if (announcementIndex === 5) {
      setIsExpanded5(!isExpanded5);
    }else if (announcementIndex === 6) {
      setIsExpanded6(!isExpanded6);
    }
  };

  

  const handleNewAnnouncementSubmit = async (event) => { // Function for submitting a new announcement
    
    event.preventDefault();
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    const newAnnouncement = { title, content, timestamp: new Date() };
    setAnnouncements([...announcements, newAnnouncement]);
    event.target.elements.title.value = '';
    event.target.elements.content.value = '';
    setNewAnnouncement({ title: '', content: '' });

    try {
      const response = await fetch('/api/announcements', {  // Send a POST request to the '/api/announcements' endpoint with the new announcement data in JSON format
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnnouncement),
        
      });

      // If the response from the server indicates success, update the UI with a success message,
    // add the new announcement to the list of announcements, and clear the input fields for a new announcement

      if (response.ok) {
        document.getElementById('submitMessage').innerHTML = 'Announcement posted successfully!';
        
        setAnnouncements([...announcements, newAnnouncement]); 
        
        setNewAnnouncement({ title: '', content: '' });
      } else { // If the response from the server indicates failure, throw an error with a custom message
        throw new Error('Error posting announcement');
      }
    } catch (error) { // If an error occurs during the request or response handling, update the UI with an error message
      document.getElementById('submitMessage').innerHTML = error.message;
    }
    
  };

  return (
    <div>
      <NavigationButtons setCurrentPage={setCurrentPage} userRole={userRole} userId={userId} />
      <h1>Announcements!</h1>
      

      <div className="announcement-container">
        
      {userRole === 'teacher' && (
        
        <form onSubmit={handleNewAnnouncementSubmit}>
        <div className="announcement-card">
          Make an Announcement!
          <label>
            <input type="text" name="title" placeholder="Title of your announcement" />
          </label>
          <br />
          <label>
            <input type="text" name="content" placeholder="What is it about?" />
          </label>
          <br />
          <button type="submit">Post</button>
        </div>
      </form>
          
        )}
        
        {announcements.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((announcement, index) => (
          <div key={index} className="announcement-card">
            <h2>{announcement.title}</h2>
            <p>{announcement.content}</p>
            {userRole === 'teacher' && <button onClick={() => {
      const updatedAnnouncements = [...announcements];
      updatedAnnouncements.splice(index, 1);
      setAnnouncements(updatedAnnouncements);
      localStorage.setItem('announcements', JSON.stringify(updatedAnnouncements));
    }}>Delete post</button>}
  </div>
))}
        
  
      <div className="announcement-card">
        <h2>"Important Safety Reminder: Forbidden Forest Off-Limits!"</h2>
        <p>{isExpanded1 ? "Good afternoon, students of Hogwarts! This is Professor McGonagall speaking. I would like to remind all students that the Forbidden Forest is strictly off-limits. Several dangerous creatures have been spotted in the area recently, and we cannot risk any harm coming to our students. Anyone caught entering the Forbidden Forest will face disciplinary action, up to and including expulsion." : "Good afternoon, students of Hogwarts! This is Professor McGonagall speaking. I would like to remind all students that the Forbidden Forest is strictly off-limits. Several dangerous creatures have been spotted in the area recently, and we cannot risk any harm coming to our students. "}
        </p>
        <button onClick={() => handleExpandClick(1)}>{isExpanded1 ? "Read Less" : "Read More"}</button>
      </div>
      <div className="announcement-card">
        <h2>"Calling All Brave Witches and Wizards: Triwizard Tournament Comes to Hogwarts!"</h2>
        <p>{isExpanded2 ? "Attention, students of Hogwarts! This is Professor Dumbledore. I am pleased to announce that the school will be hosting the Triwizard Tournament this year. Students over the age of 17 may submit their names to the Goblet of Fire, and three champions will be selected to compete in a series of magical contests. The winner will receive eternal glory and a prize of 1000 Galleons." : "Attention, students of Hogwarts! This is Professor Dumbledore. I am pleased to announce that the school will be hosting the Triwizard Tournament this year. Students over the age of 17 may submit their names to the Goblet of Fire, and three champions will be selected to compete in a series of magical contests."}</p>
        <button onClick={() => handleExpandClick(2)}>{isExpanded2 ? "Read Less" : "Read More"}</button>
      </div>
      <div className="announcement-card">
        <h2>"Calling All Quidditch Fans! Hogwarts Introduces New Quidditch League"</h2>
        <p>{isExpanded3 ? "Attention, students of Hogwarts! This is Professor Dumbledore. I am pleased to announce that the school will be hosting the Triwizard Tournament this year. Students over the age of 17 may submit their names to the Goblet of Fire, and three champions will be selected to compete in a series of magical contests. The winner will receive eternal glory and a prize of 1000 Galleons." : "Attention, students of Hogwarts! This is Professor Dumbledore. I am pleased to announce that the school will be hosting the Triwizard Tournament this year. Students over the age of 17 may submit their names to the Goblet of Fire, and three champions will be selected to compete in a series of magical contests."}</p>
        <button onClick={() => handleExpandClick(3)}>{isExpanded3 ? "Read Less" : "Read More"}</button>
      </div>
      <div className="announcement-card">
        <h2>"Magical Culinary Delights Await! Hogwarts Dining Hall Introduces New Menu"</h2>
        <p>{isExpanded4 ? "Get ready to indulge in a variety of mouth-watering dishes as Hogwarts introduces its new dining hall menu. From savory stews to sweet desserts, our talented house elves have conjured up a range of magical culinary delights that are sure to satisfy your cravings." : "Get ready to indulge in a variety of mouth-watering dishes as Hogwarts introduces its new dining hall menu. From savory"}</p>
        <button onClick={() => handleExpandClick(4)}>{isExpanded4 ? "Read Less" : "Read More"}</button>
      </div>
      <div className="announcement-card">
        <h2>"Discover the Secrets of the Wizarding World with Hogwarts' New Enchantment Courses"</h2>
        <p>{isExpanded5 ? "Are you curious about the mysteries of the magical world? Sign up for Hogwarts' new Enchantment Courses and unlock the secrets of spellcasting, potion-making, and more! Our experienced professors will guide you through the intricacies of magic and help you unleash your full potential." : "Are you curious about the mysteries of the magical world? Sign up for Hogwarts' new Enchantment Courses and unlock the secrets of spellcasting, potion-making"}</p>
        <button onClick={() => handleExpandClick(5)}>{isExpanded5 ? "Read Less" : "Read More"}</button>
      </div>
      <div className="announcement-card">
        <h2>"Hogwarts Throws an Enchanted Masquerade Ball!"</h2>
        <p>{isExpanded6 ? "Get ready for a night of enchantment and mystery as Hogwarts hosts its first-ever Masquerade Ball! Don your best magical attire and prepare to dance the night away amidst a magical setting filled with surprises and wonder. Don't miss out on this magical evening!" : "Get ready for a night of enchantment and mystery as Hogwarts hosts its first-ever Masquerade Ball! Don your best magical attire and prepare to dance"}</p>
        <button onClick={() => handleExpandClick(6)}>{isExpanded6 ? "Read Less" : "Read More"}</button>
      </div>
      </div>
    </div>
  );
}

export default Announcements;
