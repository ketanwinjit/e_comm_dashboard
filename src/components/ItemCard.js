import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AppTheme from "../common/styles";
import Icon from "@material-tailwind/react/Icon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { addCategory, deleteCategory } from "../backend/categories";

function ItemCard(props) {
  console.log("CAT", props.data);
  const { Theme, data, getAllCategory } = props;
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [updateCategoryName, setUpdateCategoryName] = useState(
    data.categoryName
  );
  const [updatedCategoryImage, setUpdatedCategoryImage] = useState("");
  const [updateCategoryImageDisplay, setUpdateCategoryImageDisplay] =
    useState("");

  function previewFile(event) {
    setUpdatedCategoryImage(event.target.files[0]);
    const preview = event.target.files;
    const file = preview[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        setUpdateCategoryImageDisplay(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const deleteCategories = () => {
    let info = {
      id: categoryId,
      public_id: publicId,
    };
    deleteCategory(info)
      .then((res) => {
        console.log("DELETE CAT RES", res);
        if (res.success === true) {
          getAllCategory();
          setMessage(res.message);
          setSuccess(true);
          setDeleteCategoryModal(false);
          setTimeout(() => {
            setMessage("");
            setSuccess(false);
          }, 2000);
        }
        if (res.success === false) {
          setMessage(res.Message);
          setError(true);
          setDeleteCategoryModal(false);
          setTimeout(() => {
            setMessage("");
            setError(false);
          }, 2000);
        }
      })
      .catch((error) => {
        console.log("DELETE CAT ERROR", error);
        setMessage("Something went wrong");
        setError(true);
        setDeleteCategoryModal(false);
        setTimeout(() => {
          setMessage("");
          setError(false);
        }, 2000);
      });
  };

  const deleteCategoryModalInvoke = (state) => {
    return (
      <>
        <Modal
          size="sm"
          active={deleteCategoryModal}
          toggler={() => setDeleteCategoryModal(false)}
        >
          <ModalHeader toggler={() => setDeleteCategoryModal(false)}>
            Delete Category
          </ModalHeader>
          <ModalBody>
            <h4> Are you sure you want to delete category? </h4>
          </ModalBody>
          <ModalFooter>
            <Button
              color="red"
              buttonType="link"
              onClick={(e) => setDeleteCategoryModal(false)}
              ripple="dark"
            >
              Close
            </Button>

            <Button
              color="green"
              onClick={() => {
                deleteCategories();
              }}
              ripple="light"
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  };

  const updateCategoryModalInvoke = () => {
    return (
      <>
        <Modal
          size="sm"
          active={updateCategoryModal}
          toggler={() => setUpdateCategoryModal(false)}
        >
          <ModalHeader toggler={() => setUpdateCategoryModal(false)}>
            Update Category
          </ModalHeader>
          <ModalBody>
            <h6 className="mt-2 mb-2">Enter Category Name</h6>
            <input
              type="text"
              className="form-control w-72"
              aria-label="Enter Category Name"
              aria-describedby="basic-addon2"
              value={updateCategoryName}
              onChange={(e) => setUpdateCategoryName(e.target.value)}
            />
            <h6 className="mt-2 mb-2">Select Category Image</h6>
            <div className="form-control flex justify-center h-24 items-center">
              <label id="categoryImageUpdate" className="cursor-pointer">
                {!updateCategoryImageDisplay && <Icon name={"add_a_photo"} />}
                <input
                  style={{ display: "none", cursor: "pointer" }}
                  id="categoryImageUpdate"
                  type="file"
                  accept=".png,.jpeg,.jpg"
                  alt="Submit"
                  width="48"
                  height="48"
                  onChange={(event) => previewFile(event)}
                />
                {updateCategoryImageDisplay && (
                  <img
                    src={updateCategoryImageDisplay}
                    alt="category"
                    width={60}
                    height={60}
                    id="categoryImageUpdate"
                    className="cursor-pointer"
                  />
                )}
              </label>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="red"
              buttonType="link"
              onClick={(e) => setUpdateCategoryModal(false)}
              ripple="dark"
            >
              Close
            </Button>

            <Button
              color="green"
              onClick={() => {
                updateCategoryApi();
              }}
              ripple="light"
            >
              Update
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  };

  const updateCategoryApi = () => {
    addCategory(categoryId, updateCategoryName, updatedCategoryImage, "UPDATE")
      .then((res) => {
        console.log("update res", res);
        if (res.success === true) {
          getAllCategory();
          setMessage("Category Updated");
          setUpdateCategoryModal(false);
          setSuccess(true);
          setTimeout(() => {
            setMessage("");
            setSuccess(false);
          }, 2000);
        }
        if (res.success === false) {
          setMessage("Error in updating aategory");
          setUpdateCategoryModal(false);
          setError(true);
          setTimeout(() => {
            setMessage("");
            setError(false);
          }, 2000);
        }
      })
      .catch((error) => {
        console.log("Update Error", error);
        setMessage("Error in updating aategory");
        setUpdateCategoryModal(false);
        setError(true);
        setTimeout(() => {
          setMessage("");
          setError(false);
        }, 2000);
      });
  };

  return (
    <>
      <CardContainer
        theme={Theme.THEME}
        className="px-3 py-3 rounded-md shadow-sm bg-gray-300 w-40 ml-4 mr-4 mt-6 mb-8 max-w-2xl cursor-pointer"
      >
        <div
          className="flex justify-end"
          onClick={() => {
            setCategoryId(data.id);
            setPublicId(data.public_id);
            setDeleteCategoryModal(true);
          }}
        >
          <Icon name="delete" />
        </div>
        <div
          onClick={() => {
            console.log("select for update", data);
            setCategoryId(data.id);
            setUpdateCategoryModal(true);
          }}
          className="flex flex-col justify-between items-center"
        >
          <img
            src={data.categoryImage}
            alt={data.categoryName}
            width={48}
            height={48}
            className="mx-2 my-2"
          />
          <p className="font-medium ">{data.categoryName}</p>
        </div>
      </CardContainer>
      {deleteCategoryModalInvoke()}
      {updateCategoryModalInvoke()}
    </>
  );
}

const mapStateToProps = (state) => ({
  Theme: state.Theme,
});

export default connect(mapStateToProps, null)(ItemCard);

const CardContainer = styled.div`
  background-color: ${({ theme }) => AppTheme[theme].ITEMCARD};
`;
