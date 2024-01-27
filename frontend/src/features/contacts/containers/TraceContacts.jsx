import React from "react";
import UserTable from "../components/UserTable";
import Header from "../../../components/header/Header";
import { useSelector } from "react-redux";
import { useFetch } from "../../../hooks/useFetch";
import store from "../../../store/store";
import { getUser } from "../contactThunks";

function TraceContacts() {
  const { users } = useSelector((state) => state.contact);

  useFetch(() => store.dispatch(getUser()));

  return (
    <>
      <Header
        title={"Trace Contacts"}
        subTitle={
          "Identify the user that has been close contact to the infected user."
        }
        hideButton={true}
      ></Header>
      <UserTable {...users}></UserTable>
    </>
  );
}

export default TraceContacts;
