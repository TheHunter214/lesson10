import { useEffect, useState } from 'react';
import './App.css';
import TmnCateGoryList from './components/TmnCateGoryList';
import axios from "./api/TmnApi";
import TmnCateGoryForm from './components/TmnCateGoryForm';

function TmnApp() {
  // Lấy dữ liệu từ API
  const [tmnCategories, setTmnCategories] = useState([]);

  const getCategories = async () => {
    try {
      const tmnCateResponse = await axios.get("TmnCateGoryList");
      setTmnCategories(tmnCateResponse.data);
    } catch (error) {
      console.log("Lỗi:", error);
    }
  };

  useEffect(() => {
    getCategories();
    console.log("tmnCategories:", tmnCategories);
  }, []);

  // Trạng thái form
  const [tmnCategoryIsForm, setTmnCategoryIsForm] = useState(false);

  const tmnHandleAddNew = (param) => {
    setTmnCategoryIsForm(param);
  };

  const tmnHandleCategoryCloseForm = (param) => {
    setTmnCategoryIsForm(param);
  };

  const tmnHandleCategorySubmit = (param) => {
    let id = tmnCategories.length > 0 ? tmnCategories[tmnCategories.length - 1].tmnId : 0;
    console.log("Mã:", id);
    param.tmnId = id + 1;
    setTmnCategories((prev) => [...prev, param]);
    setTmnCategoryIsForm(false);
  };

  return (
    <div className="container border my-3">
      <h1>TranMinhNam - Call API</h1>
      <TmnCateGoryList renderTmnCategories={tmnCategories} onAddNew={tmnHandleAddNew} />
      <hr />
      {tmnCategoryIsForm && (
        <TmnCateGoryForm onCloseForm={tmnHandleCategoryCloseForm} onCategorySubmit={tmnHandleCategorySubmit} />
      )}
    </div>
  );
}

export default TmnApp;
