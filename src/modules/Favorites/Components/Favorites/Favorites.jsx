import React, { useEffect, useState } from "react"
import img from "../../../../assets/imgs/recipes.png"
import noData from "../../../../assets/imgs/no-data.png"

import Header from "../../../Shared/components/Header/Header"
import axios from "axios"
import { FAV_URLS } from "../../../../Utils/END_POINTS"
import { Container, Row, Col, Card } from "react-bootstrap"
import { BiHeart } from "react-icons/bi"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import NoData from "../../../Shared/components/NoData/NoData"

export default function Favorites() {
  const [favorites, setFavorites] = useState([])

  const navigate = useNavigate()
  const getFavorites = async () => {
    try {
      let response = await axios.get(FAV_URLS.get, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("foodToken")}`,
        },
      })
      setFavorites(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeFavorite = async (recipeId) => {
    try {
      let response = await axios.delete(FAV_URLS.remove(recipeId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("foodToken")}`,
        },
      })
      console.log(response)
      getFavorites()
      toast.success("Successfully Removed")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFavorites()
  }, [])

  return (
    <>
      <Header
        title="Favorite Items"
        description="You can now add your items that any user can order from the Application and you can edit."
        imgUrl={img}
      />
      <Container className="my-4">
        {favorites.length === 0 ? (
          <NoData />
        ) : (
          <Row>
            {favorites.map((favorite) => (
              <Col key={favorite.id} md={4} className="mb-4">
                <Card className="position-relative">
                  <Card.Img
                    variant="top"
                    src={`${
                      favorite.recipe?.imagePath !== ""
                        ? favorite.recipe?.imagePath
                        : noData
                    }`}
                    alt={favorite.recipe.name}
                  />
                  <BiHeart
                    className="position-absolute top-0 end-0 m-2"
                    size={30}
                    color="red"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeFavorite(favorite.id)}
                  />
                  <Card.Body>
                    <Card.Title>{favorite.recipe.name}</Card.Title>
                    <Card.Text>{favorite.recipe.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  )
}
