import React, { useState, useContext, useEffect } from "react";
import { BsMic } from "react-icons/bs";
import { ExpenseTrackerContext } from "../../context/context";
import { v4 as uuidv4 } from "uuid";
import { incomeCategories, expenseCategories } from "../../constants/category";
import formatDate from "../../utils/formatDate";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
} from "@speechly/react-ui";
import { useSpeechContext } from "@speechly/react-client";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(new Date()),
};

const Main = () => {
  const { balance } = useContext(ExpenseTrackerContext);

  const [formData, setFormData] = useState(initialState);

  const { addTransaction } = useContext(ExpenseTrackerContext);

  const { segment } = useSpeechContext();

  const createTransaction = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes("-"))
      return;

    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    };
    addTransaction(transaction);
    setFormData(initialState);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setFormData({ ...formData, type: "Expense" });
      } else if (segment.intent.intent === "add_income") {
        setFormData({ ...formData, type: "Income" });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setFormData(initialState);
      }

      segment.entities.forEach((s) => {
        const category = `${s.value.charAt(0)}${s.value
          .slice(1)
          .toLowerCase()}`;

        switch (s.type) {
          case "amount":
            setFormData({ ...formData, amount: s.value });
            break;
          case "category":
            if (incomeCategories.map((iC) => iC.type).includes(category)) {
              setFormData({ ...formData, type: "Income", category });
            } else if (
              expenseCategories.map((iC) => iC.type).includes(category)
            ) {
              setFormData({ ...formData, type: "Expense", category });
            }
            break;
          case "date":
            setFormData({ ...formData, date: s.value });
            break;
          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.type &&
        formData.date
      ) {
        createTransaction();
      }
    }
  }, [segment]);

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <div>
      <div className="form form-title">
        <h3>Hello Saptashree!</h3>
        <p>Take a look at your total balance</p>
        <h1>
          Total Balance: <span>${balance}</span>
        </h1>
        <p>{segment && segment.words.map((w) => w.value).join(" ")}</p>
        <div className="formData">
          <label className="label" htmlFor="Type">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="input"
            type="text"
            placeholder="Type"
            id="type"
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className="formData">
          <label className="label" htmlFor="Category">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="input"
            type="text"
            placeholder="Category"
            id="category"
          >
            <option value="" disabled>
              Select Type
            </option>
            {selectedCategories.map((c) => (
              <option key={c.type} value={c.type}>
                {c.type}
              </option>
            ))}
          </select>
        </div>
        <div className="formData">
          <label className="label" htmlFor="Name">
            Amount
          </label>
          <input
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="input"
            type="text"
            placeholder="Amonut"
            id="name"
          />
        </div>
        <div className="formData">
          <label className="label" htmlFor="Date">
            Date
          </label>
          <input
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: formatDate(e.target.value) })
            }
            className="input"
            type="date"
            placeholder="Date"
            id="date"
          />
        </div>
        <button className="button" onClick={createTransaction}>
          Create
        </button>
        <div className="mic">
          <PushToTalkButtonContainer>
            <PushToTalkButton />
          </PushToTalkButtonContainer>
        </div>
      </div>
    </div>
  );
};

export default Main;
