import { Router } from "express";
import { addtoWishlist, getLoggedUserWishlist, removeFromWishlist } from "./wishlist.controller.js";

const wishlistRouter = Router()
wishlistRouter
.route('/')
.patch(addtoWishlist)
.get(getLoggedUserWishlist)
wishlistRouter
.route('/:id')
.delete(removeFromWishlist)