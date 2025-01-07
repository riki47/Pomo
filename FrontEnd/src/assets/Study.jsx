import React, { useEffect, useState } from "react";
import axios from "axios";

function StudyTracker({ email }) {
  const [studySessions, setStudySessions] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Fetch study sessions from the database
  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/study?email=${email}`);
        if (response.status === 200) {
          setStudySessions(response.data.sessions);
          const totalMinutes = response.data.sessions.reduce(
            (sum, session) => sum + session.duration,
            0
          );
          setTotalTime(totalMinutes);
        }
      } catch (error) {
        console.error("Error fetching study data:", error);
      }
    };

    if (email) fetchStudyData();
  }, [email]);

  // Start the timer when the component mounts
  useEffect(() => {
    const start = Date.now();
    setStartTime(start);

    // Update elapsed time every second
    const timerInterval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - start) / 60000)); // Convert milliseconds to minutes
    }, 1000);

    // Handle page unload (close or refresh) to log the session
    const handleUnload = async () => {
      if (email && elapsedTime > 0) {
        await logStudySession(elapsedTime);
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      clearInterval(timerInterval);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [email, elapsedTime]);

  // Log a study session
  const logStudySession = async (duration) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/study`, {
        email,
        duration,
      });

      if (response.status === 200) {
        setStudySessions((prev) => [...prev, { duration, timestamp: new Date() }]);
        setTotalTime((prev) => prev + duration);
      }
    } catch (error) {
      console.error("Error logging study session:", error);
    }
  };

  // Format time in hours and minutes
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-[#2a2824] p-6 rounded-xl shadow-lg w-[30rem] sm:w-[35rem] border border-[#423d33]">
      <h1 className="text-3xl font-serif text-[#f4ede4] mb-4 border-b border-[#423d33] pb-2">
        <span className="uppercase tracking-wider">Today's Study Tracker</span>
      </h1>
      <p className="text-[#d3cdc3] text-lg mb-4 font-light">
        <strong>Total Study Time:</strong> {formatTime(totalTime)}
      </p>
      <div className="bg-[#1f1d1a] p-4 rounded-lg max-h-60 overflow-y-auto border border-[#3a352c]">
        {studySessions.length > 0 ? (
          studySessions.map((session, index) => (
            <div
              key={index}
              className="text-[#d3cdc3] mb-3 border-b border-[#3a352c] pb-2"
            >
              <span className="font-medium">Session {index + 1}:</span> {formatTime(session.duration)}{" "}
              - <span className="italic">{new Date(session.timestamp).toLocaleString()}</span>
            </div>
          ))
        ) : (
          <p className="text-[#a79f91] italic">No sessions logged today. Begin your journey of focus.</p>
        )}
      </div>
      <p className="mt-4 text-[#d3cdc3] font-light">
        <strong>Current Session:</strong> {formatTime(elapsedTime)}
      </p>
    </div>
  );
}

export default StudyTracker;
