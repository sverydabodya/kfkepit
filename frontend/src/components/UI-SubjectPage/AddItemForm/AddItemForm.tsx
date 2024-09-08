import { FC, useState } from "react";
import Select , { MultiValue } from 'react-select';
import customStyles from "../SelectStyles/SelectStyles";
import makeAnimated from 'react-select/animated';
import classes from './AddItemForm.module.scss'
import { Item } from "../MainMaterial/MainMaterial";
import { createMaterial } from "../../../network/auth_api";

interface Group{
    id: string,
    name: string,
    courseId: string
}

interface AddItemFormProps {
  onAddItem: (material: Item) => void;
  subject: string;
  groups: GroupOption[];
}

interface GroupOption {
    value: string;
    label: string;
}
export interface createdItem {
    name: string;
    groups: Group[];
    files: File[];
    subject: string;
}



const AddItemForm: FC<AddItemFormProps> = ({ onAddItem, subject, groups }) => {
    const [name, setName] = useState('');
    const [selectGroups, setSelectGroups] = useState<MultiValue<GroupOption>>([]);
    const [files, setFiles] = useState<File[]>([]);
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name && selectGroups.length > 0 && files.length > 0) {
        const selectedGroups: Group[] = selectGroups.map(group => ({
            id: group.value, 
            name: group.label,
            courseId: "someCourseId" 
        }));
        const newMaterial:createdItem = {name, groups: selectedGroups, files, subject};
        try {
            const createdMaterial = await createMaterial(newMaterial);
            console.log('Material created successfully:', createdMaterial);
            onAddItem(createdMaterial); 
        } catch (error) {
            console.error('Error creating material:', error);
        }
        
        } else {
        alert('Будь ласка, заповніть всі поля!');
        }
    
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles([...files, ...Array.from(e.target.files)]);
        }
    };

    const handleFileRemove = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };


    return (
        <form onSubmit={handleSubmit}>
            <h3 className={classes.form__title}>Додати матеріал</h3>
            <div className={classes.form__info}>
                <input
                    className={classes.form__input}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Наприклад: “Лекція №1. Кібербезпека”"
                />
                <Select
                    isMulti
                    options={groups}
                    styles={customStyles}
                    components={makeAnimated()}
                    value={selectGroups}
                    onChange={setSelectGroups}
                    placeholder="Виберіть групи"
                />
            </div>
            <div className={classes.form__files}>
                <div className={classes.form__add_wrapper}>
                    <input
                        className={classes.form__add}
                        type="file"
                        accept=".pdf, .docs, .doc"
                        multiple
                        onChange={handleFileChange}
                    />
                    <button type="button" className={classes.form__add_button}>Додати ще</button>
                </div>
                <ul className={classes.form__items}>
                    {files.map((file, index) => (
                        <li className={classes.form__item} key={index}>
                            <div className={classes.form__file}>{file.name}</div>
                            <button className={classes.form__delete} type="button" onClick={() => handleFileRemove(index)}>Видалити</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={classes.form__button}>
                <button type="submit">Опублікувати</button>
            </div>
        </form>
    );
};

export default AddItemForm;