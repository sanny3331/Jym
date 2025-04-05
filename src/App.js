import React, { useState } from 'react';
const days = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"];
const App = () => {
  const [projects, setProjects] = useState([{ name: "Projekt 1", weeks: [{ calendar: {} }] }]);
  const [currentProject, setCurrentProject] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const addProject = () => {
    const newName = `Projekt ${projects.length + 1}`;
    setProjects([...projects, { name: newName, weeks: [{ calendar: {} }] }]);
  };
  const addWeek = () => {
    const current = projects[currentProject].weeks[currentWeek];
    const copy = JSON.parse(JSON.stringify(current));
    const updated = [...projects];
    updated[currentProject].weeks.push(copy);
    setProjects(updated);
    setCurrentWeek(updated[currentProject].weeks.length - 1);
  };
  const addWorkout = () => {
    const updated = [...projects];
    const cal = updated[currentProject].weeks[currentWeek].calendar;
    if (!cal[selectedDay]) cal[selectedDay] = [];
    cal[selectedDay].push({ name: newWorkoutName, exercises: [] });
    setProjects(updated);
    setNewWorkoutName("");
    setSelectedDay(null);
  };
  const addExercise = (day, wIndex) => {
    const updated = [...projects];
    const workout = updated[currentProject].weeks[currentWeek].calendar[day][wIndex];
    workout.exercises.push({ sets: [{ weight: "", reps: "", rir: "" }] });
    setProjects(updated);
  };
  const addSet = (day, wIndex, eIndex) => {
    const updated = [...projects];
    const sets = updated[currentProject].weeks[currentWeek].calendar[day][wIndex].exercises[eIndex].sets;
    sets.push({ weight: "", reps: "", rir: "" });
    setProjects(updated);
  };
  const updateSet = (day, wIndex, eIndex, sIndex, field, value) => {
    const updated = [...projects];
    updated[currentProject].weeks[currentWeek].calendar[day][wIndex].exercises[eIndex].sets[sIndex][field] = value;
    setProjects(updated);
  };
  return (
    <div style={{ padding: 20 }}>
      <div><strong>Projekty:</strong>{" "}
        {projects.map((p, i) => (
          <button key={i} onClick={() => { setCurrentProject(i); setCurrentWeek(0); }}>
            {p.name}
          </button>
        ))}
        <button onClick={addProject}>+ Projekt</button>
      </div>
      <div style={{ marginTop: 10 }}><strong>Týdny:</strong>{" "}
        {projects[currentProject].weeks.map((_, i) => (
          <button key={i} onClick={() => setCurrentWeek(i)}>Týden {i + 1}</button>
        ))}
        <button onClick={addWeek}>+ Týden</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10, marginTop: 20 }}>
        {days.map((day) => (
          <div key={day} style={{ border: '1px solid #ccc', padding: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{day}</strong>
              <button onClick={() => setSelectedDay(day)}>+</button>
            </div>
            {projects[currentProject].weeks[currentWeek].calendar[day]?.map((workout, wIndex) => (
              <div key={wIndex} style={{ marginTop: 10 }}>
                <strong>{workout.name}</strong>
                {workout.exercises.map((ex, eIndex) => (
                  <div key={eIndex}>
                    <div style={{ fontSize: 12, marginTop: 5 }}>Cvik {eIndex + 1}</div>
                    {ex.sets.map((set, sIndex) => (
                      <div key={sIndex} style={{ display: 'flex', gap: 5, marginBottom: 5 }}>
                        <input placeholder="Váha" value={set.weight} onChange={(e) => updateSet(day, wIndex, eIndex, sIndex, 'weight', e.target.value)} />
                        <input placeholder="Opak." value={set.reps} onChange={(e) => updateSet(day, wIndex, eIndex, sIndex, 'reps', e.target.value)} />
                        <input placeholder="RIR" value={set.rir} onChange={(e) => updateSet(day, wIndex, eIndex, sIndex, 'rir', e.target.value)} />
                      </div>
                    ))}
                    <button onClick={() => addSet(day, wIndex, eIndex)}>+ Set</button>
                  </div>
                ))}
                <button onClick={() => addExercise(day, wIndex)} style={{ marginTop: 5 }}>+ Cvik</button>
              </div>
            ))}
          </div>
        ))}
      </div>
      {selectedDay && (
        <div style={{ marginTop: 20 }}>
          <input placeholder="Název workoutu" value={newWorkoutName} onChange={(e) => setNewWorkoutName(e.target.value)} />
          <button onClick={addWorkout}>Přidat workout do {selectedDay}</button>
        </div>
      )}
    </div>
  );
};
export default App;
