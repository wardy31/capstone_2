import React from "react";
import UserTable from "../../components/UserTable";
import { useFetch } from "../../../../hooks/useFetch";
import { getUsers } from "../../userThunks";
import store from "../../../../store/store";
import { useSelector } from "react-redux";
import Header from "../../../../components/header/Header";

function User() {
  const { data, loading } = useSelector((state) => state.user.getUser);

  useFetch(() => store.dispatch(getUsers()));

  return (
    <>
      <Header title={"Users"} hideButton={true}></Header>
      <UserTable data={data}></UserTable>
    </>
  );
}

export default User;
