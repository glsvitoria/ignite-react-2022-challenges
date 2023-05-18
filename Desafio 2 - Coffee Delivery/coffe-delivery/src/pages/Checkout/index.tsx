import { useCallback, useRef, useState } from "react";

import { Form } from "@unform/web";
import styles from "./styles.module.scss";
import { CurrencyDollar, MapPinLine } from "@phosphor-icons/react";
import Input from "../../components/Input";
import MeansOfPayment from "../../components/Buttons/MeansOfPayment";
import { useCoffee } from "../../hooks/coffeesSelected";
import CardInCart from "../../components/Cards/CardInCart";
import Button from "../../components/Buttons/Button";
import formatNumber from "../../utils/formatNumber";
import * as Yup from "yup";
import { FormHandles } from "@unform/core";
import getValidationErrors from "../../utils/getValidationErrors";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import loading from "../../assets/loading.json";

type TFormData = {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  meansOfPayment: string;
};

const validateStates = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export default function Checkout() {
  const { coffeeSelected } = useCoffee();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);

  const totalItemsValue = useCallback(() => {
    return coffeeSelected.reduce(
      (acc, item) => (acc += item.value * item.quantity),
      0,
    );
  }, [coffeeSelected]);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmit = useCallback(
    async (formData: TFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cep: Yup.string()
            .matches(/^\d{8}$/, "CEP inválido")
            .required("CEP é obrigatório"),
          street: Yup.string().required("Rua é obrigatório"),
          number: Yup.string().required("Número é obrigatório"),
          neighborhood: Yup.string().required("Bairro é obrigatório"),
          city: Yup.string().required("Cidade é obrigatório"),
          state: Yup.string()
            .required("UF é obrigatório")
            .test("validate-state", "UF inexistente", value =>
              validateStates.includes(value.toUpperCase()),
            ),
        });

        const schemaValidated = await schema.validate(formData, {
          abortEarly: false,
        });
        setIsLoading(true);

        localStorage.setItem(
          "@coffee-delivery:order",
          JSON.stringify({
            city: formData.city,
            state: formData.state,
            meansOfPayment: formData.meansOfPayment,
            street: formData.street,
            number: formData.number,
            neighborhood: formData.neighborhood,
          }),
        );

        console.log({
          ...schemaValidated,
          totalValue: totalItemsValue() / 100 + 3.5,
          meansOfPayment: formData.meansOfPayment,
          coffees: coffeeSelected.map(coffee => {
            return {
              name: coffee.title,
              description: coffee.description,
              quantity: coffee.quantity,
              value: coffee.value / 100,
              total: coffee.quantity * (coffee.value / 100),
            };
          }),
        });

        setInterval(() => {
          navigate("/pedido-confirmado");
        }, 3000);
      } catch (err) {
        // toast.error(`Erro ao enviar informações. ${handleMessageError(err)}`);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [coffeeSelected, navigate, totalItemsValue],
  );

  if (coffeeSelected.length === 0) {
    navigate("/");
  }

  return (
    <Form onSubmit={handleSubmit} ref={formRef} className={styles.container}>
      <section className={styles.leftContainer}>
        <h2 className={styles.title}>Complete seu pedido</h2>
        <div className={`${styles.box} ${styles.form}`}>
          <div className={styles.header}>
            <MapPinLine size={32} weight="regular" />
            <div>
              <h3>Endereço de entrega</h3>
              <p>Informe o endereço onde deseja receber seu pedido</p>
            </div>
          </div>

          <div className={styles.form}>
            <Input name="cep" label="CEP" maxLength={8} />
            <Input name="street" label="Rua" />
            <div className={styles.line}>
              <Input
                name="number"
                label="Número"
                containerClassName={styles.number}
                type="number"
              />
              <Input name="complement" label="Complemento" />
            </div>
            <div className={styles.line}>
              <Input
                name="neighborhood"
                label="Bairro"
                containerClassName={styles.number}
              />
              <Input name="city" label="Cidade" />
              <Input
                name="state"
                label="UF"
                containerClassName={styles.uf}
                maxLength={2}
              />
            </div>
          </div>
        </div>
        <div className={`${styles.box} ${styles.paymentContainer}`}>
          <div className={styles.header}>
            <CurrencyDollar size={32} weight="regular" />
            <div>
              <h3>Pagamento</h3>
              <p>
                O pagamento é feito na entrega. Escolha a forma que deseja pagar
              </p>
            </div>
          </div>

          <MeansOfPayment type="button" />
        </div>
      </section>

      <section className={styles.rightContainer}>
        <h2 className={styles.title}>Cafés selecionados</h2>
        <div className={styles.box}>
          {coffeeSelected.map(coffee => (
            <CardInCart coffee={coffee} key={coffee.code} />
          ))}
          <ul className={styles.finalValue}>
            <li>
              <p>Total de itens</p>
              <span>
                {formatNumber({
                  data: totalItemsValue() / 100,
                  type: "currency",
                })}
              </span>
            </li>
            <li>
              <p>Entrega</p>
              <span>R$ 3,50</span>
            </li>
            <li>
              <strong>Total</strong>
              <strong>
                {formatNumber({
                  data: totalItemsValue() / 100 + 3.5,
                  type: "currency",
                })}
              </strong>
            </li>
          </ul>

          <Button type="submit">Confirmar pedido</Button>
          {isLoading && (
            <div>
              <Lottie options={defaultOptions} />
            </div>
          )}
        </div>
      </section>
    </Form>
  );
}
