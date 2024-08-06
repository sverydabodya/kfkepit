import { FC, useState } from "react";
import Select , { MultiValue } from 'react-select';
import customStyles from "../SelectStyles/SelectStyles";
import makeAnimated from 'react-select/animated';
import classes from './AddItemForm.module.scss'



interface AddItemFormProps {
    onAddItem: (name: string, groups: string[], files: File[]) => void;
}

interface GroupOption {
    value: string;
    label: string;
}
const groupOptions: GroupOption[] = [
    { value: 'КІ-11', label: 'КІ-11' },
    { value: 'КІ-21', label: 'КІ-21' },
    { value: 'КІ-31', label: 'КІ-31' },
    { value: 'КІ-41', label: 'КІ-41' },
    { value: 'М-11', label: 'М-11' },
    { value: 'М-21', label: 'М-21' },
    { value: 'М-31', label: 'М-31' },
    { value: 'М-41', label: 'М-41' },
    { value: 'ФБС-11', label: 'ФБС-11' },
    { value: 'ФБС-21', label: 'ФБС-21' },
    { value: 'ФБС-31', label: 'ФБС-31' },
    { value: 'ФБС-41', label: 'ФБС-41' },
    { value: 'КБ-11', label: 'КБ-11' },
    { value: 'КБ-21', label: 'КБ-21' },
    { value: 'КБ-31', label: 'КБ-31' },
    { value: 'КБ-41', label: 'КБ-41' },
    { value: 'ПР-11', label: 'ПР-11' },
    { value: 'ПР-21', label: 'ПР-21' },
    { value: 'ПР-31', label: 'ПР-31' },
    { value: 'ПР-41', label: 'ПР-41' },
  ];


const AddItemForm: FC<AddItemFormProps> = ({ onAddItem }) => {
    const [name, setName] = useState('');
    const [groups, setGroups] = useState<MultiValue<GroupOption>>([]);
    const [files, setFiles] = useState<File[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && groups.length > 0) {
            onAddItem(name, groups.map(group => group.value), files);
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
                    options={groupOptions}
                    styles={customStyles}
                    components={makeAnimated()}
                    value={groups}
                    onChange={setGroups}
                    placeholder="Виберіть групи"
                />
            </div>
            <div className={classes.form__files}>
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                />
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