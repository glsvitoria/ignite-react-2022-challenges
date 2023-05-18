import { Check, Trash } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";
import { TodoItemType } from "../../@types/types";
import styles from "./styles.module.scss";

interface ITodoItemProps {
  data: TodoItemType;
  setTodoAdded: Dispatch<SetStateAction<TodoItemType[]>>;
  index: number;
}

export function TodoItem({ data, setTodoAdded, index }: ITodoItemProps) {
  return (
    <div className={styles.itemContainer}>
      <div
        className={data.isChecked ? styles.wasChecked : styles.wasntChecked}
        onClick={() => {
          setTodoAdded(state => {
            return state.map(item => {
              if (item.id === data.id) {
                return { ...item, isChecked: !data.isChecked };
              }
              return item;
            });
          });
        }}
      >
        {data.isChecked && <Check color="#FFF" />}
      </div>
      <p className={data.isChecked ? styles.textChecked : styles.textNoChecked}>
        {data.title}
      </p>
      <Trash
        size={20}
        className={styles.trash}
        onClick={() => {
          setTodoAdded(state => state.filter(item => item.id !== data.id));
        }}
      />
    </div>
  );
}
