import { FC, useState, useEffect } from "react";
import Select from "react-select";
import customStyles from "../SelectStyles/SelectStyles";
import makeAnimated from "react-select/animated";
import classes from "./AddScheduleForm.module.scss";
import { createSchedule } from "../../../network/auth_api";
import { createdSchedule, Schedule } from "../ScheduleMain/SсheduleMain";

interface ScheduleFormProps {
  onAddSchedule: (schedule: Schedule) => void;
  courses: GroupOption[];
}

interface GroupOption {
  value: string;
  label: string;
}

const AddScheduleForm: FC<ScheduleFormProps> = ({ onAddSchedule, courses }) => {
  const [name, setName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<GroupOption | null>(
    null
  );
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && selectedCourse && file) {
      const newSchedule: createdSchedule = {
        name,
        schedule: file,
        courseId: selectedCourse.value,
      };
      try {
        const createdSchedule = await createSchedule(newSchedule);
        console.log("Schedule created successfully:", createdSchedule);
        onAddSchedule(createdSchedule);
      } catch (error) {
        console.error("Error creating schedule:", error);
      }
    } else {
      alert("Будь ласка, заповніть всі поля!");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h3 className={classes.form__title}>Додати розклад</h3>

      <div className={classes.form__info}>
        <input
          className={classes.form__input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Назва розкладу"
        />
        <Select
          className={classes.form__select}
          options={courses}
          styles={customStyles}
          components={makeAnimated()}
          value={selectedCourse}
          onChange={setSelectedCourse}
          placeholder="Виберіть курс"
        />
      </div>
      <input
        className={classes.form__add}
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
      />
      <div className={classes.form__label}>
        Зауважте, що розклад може бути тільки 1 для кожно курсу!
      </div>
      <div className={classes.form__button}>
        <button type="submit">Зберегти</button>
      </div>
    </form>
  );
};

export default AddScheduleForm;
