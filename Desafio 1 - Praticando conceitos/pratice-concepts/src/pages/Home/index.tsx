import { ClipboardText } from "@phosphor-icons/react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { PlusCircle } from "phosphor-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TodoItemType } from "../../@types/types";
import imgTodoLogo from "../../assets/todolist-logo.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { TodoItem } from "../../components/TodoItem";
import styles from "./styles.module.scss";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";

type FormDataType = {
  addTodo: string;
};

export function Home() {
  const formRef = useRef<FormHandles>(null);

  const [todoAdded, setTodoAdded] = useState<TodoItemType[]>([
    {
      id: uuidv4(),
      isChecked: false,
      title: "todo adicionada",
    },
    {
      id: uuidv4(),
      isChecked: true,
      title: "todo adicionada",
    },
  ]);
  const [numberOfCheckedTodos, setNumberOfCheckedTodos] = useState(0);

  const handleSubmit = useCallback(async (formData: FormDataType) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        addTodo: Yup.string().required("Obrigatório preenchimento"),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      setTodoAdded(state => [
        ...state,
        {
          id: uuidv4(),
          isChecked: false,
          title: formData.addTodo,
        },
      ]);

      formRef.current?.reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  useEffect(() => {
    const countingChecked = todoAdded.reduce((total, item) => {
      if (item.isChecked) {
        return (total += 1);
      }

      return total;
    }, 0);

    setNumberOfCheckedTodos(countingChecked);
  }, [todoAdded]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={imgTodoLogo} alt="Logo do ToDo" />
      </header>

      <main className={styles.main}>
        <Form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
          <div>
            <Input name="addTodo" placeholder="Adicione uma nova tarefa" />
            <Button className={styles.createTodoButton} type="submit">
              Criar <PlusCircle size={20} weight="bold" />
            </Button>
          </div>
        </Form>

        <section className={styles.listTodos}>
          <div className={styles.listHeader}>
            <p>
              Tarefas criadas <span>{todoAdded.length}</span>
            </p>
            <p>
              Concluídas
              {numberOfCheckedTodos === 0 ? (
                <span>0</span>
              ) : (
                <>
                  <span>
                    {numberOfCheckedTodos} de {todoAdded.length}
                  </span>
                </>
              )}
            </p>
          </div>

          <div className={styles.listContent}>
            {todoAdded.length === 0 ? (
              <>
                <ClipboardText size={56} />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </>
            ) : (
              todoAdded.map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  data={todo}
                  setTodoAdded={setTodoAdded}
                  index={index}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
