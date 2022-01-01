import React, { useState, useEffect } from "react";
import Button from "@material-tailwind/react/Button";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Icon from "@material-tailwind/react/Icon";
import { addCategory, getAllCategories } from "../backend/categories";
import ItemCard from "../components/ItemCard";

function Categories() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImageDisplay, setCategoryImageDisplay] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  function previewFile(files) {
    console.log("PREVIEW CALLED");
    setCategoryImage(files[0]);
    const file = files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        setCategoryImageDisplay(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const addCategories = (addOrUpdate) => {
    addCategory("", categoryName, categoryImage, addOrUpdate)
      .then((response) => {
        if (response.success === true) {
          getAllCategory();
          setShowCreateCategoryModal(false);
          setCategoryName("");
          setCategoryImageDisplay("");
          setMessage(response.message);
          setSuccess(true);
          setTimeout(() => {
            setMessage("");
            setSuccess(false);
          }, 2000);
        }
        if (response.success === false) {
          setShowCreateCategoryModal(false);

          setCategoryName("");
          setCategoryImageDisplay("");
          setMessage(response.message);
          setError(true);
          setTimeout(() => {
            setMessage("");
            setError(false);
          }, 2000);
        }
      })
      .catch((error) => {
        setShowCreateCategoryModal(false);

        setCategoryName("");
        setCategoryImageDisplay("");
        setMessage("Something went wrong");
        setError(true);
        setTimeout(() => {
          setMessage("");
          setError(false);
        }, 2000);
      });
  };

  const createCategoryModal = () => {
    return (
      <>
        <Modal
          size="sm"
          active={showCreateCategoryModal}
          toggler={() => setShowCreateCategoryModal(false)}
        >
          <ModalHeader toggler={() => setShowCreateCategoryModal(false)}>
            Create Category
          </ModalHeader>
          <ModalBody>
            <h6 className="mt-2 mb-2">Enter Category Name</h6>
            <input
              type="text"
              className="form-control w-72"
              aria-label="Enter Category Name"
              aria-describedby="basic-addon2"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <h6 className="mt-2 mb-2">Select Category Image</h6>
            <div className="form-control flex justify-center h-24 items-center">
              <label id="categoryImage" className="cursor-pointer">
                {!categoryImageDisplay && <Icon name={"add_a_photo"} />}
                <input
                  style={{ display: "none", cursor: "pointer" }}
                  id="categoryImage"
                  type="file"
                  accept=".png,.jpeg,.jpg"
                  alt="Submit"
                  width="48"
                  height="48"
                  onChange={(event) => previewFile(event.target.files)}
                />
                {categoryImageDisplay && (
                  <img
                    src={categoryImageDisplay}
                    alt="category"
                    width={60}
                    height={60}
                    id="categoryImage"
                  />
                )}
              </label>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="red"
              buttonType="link"
              onClick={(e) => setShowCreateCategoryModal(false)}
              ripple="dark"
            >
              Close
            </Button>

            <Button
              color="green"
              onClick={() => {
                addCategories("ADD");
              }}
              ripple="light"
            >
              Create
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  };

  const getAllCategory = () => {
    console.log("GET CATEGORIES CALLED");
    getAllCategories()
      .then((response) => {
        if (response.success === true) {
          console.log("Categories Data", response.data);
          setCategoriesData(response.data);
        }
        if (response.success === false) {
          setMessage(response.message);
          setError(true);
          setTimeout(() => {
            setMessage("");
            setError(false);
          }, 2000);
        }
      })
      .catch((error) => {
        setMessage("Something went wrong");
        setError(true);
        setTimeout(() => {
          setMessage("");
          setError(false);
        }, 2000);
      });
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="flex px-4 py-4">
      <div className="max-w-3xl mx-auto flex-1">
        <div className="place-content-end flex">
          <div
            className="cursor-pointer"
            onClick={() => {
              setShowCreateCategoryModal(true);
            }}
          >
            <Icon name={"add_circle"} size={24} color={"purple"} />
          </div>
        </div>
        <div className="flex flex-wrap items-center ">
          {categoriesData &&
            categoriesData.map((category, index) => {
              return (
                <div key={index}>
                  <ItemCard data={category} getAllCategory={getAllCategory} />
                </div>
              );
            })}
          {categoriesData.length === 0 && (
            <h4 className="font-medium text-center">No Categories Available</h4>
          )}
        </div>

        {createCategoryModal()}
        {error && (
          <div className="alert alert-secondary" role="alert">
            {message}
          </div>
        )}
        {success && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories;
