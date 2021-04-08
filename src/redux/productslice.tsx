import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";

export interface ProductsType2 {
  docs: any /* ProductBaseDocumentType[] */;
  productByPrice: {
    [key: string]: /*  ProductBaseDocumentType[]; */ any[];
  };
}

export interface ProductState {
  products: ProductsType2;
  loading: "ready" | "pending" | "finished" | "failed";
  error: {
    success: boolean;
    errorInfo: any;
  };
  pageInfo: /* PageBaseDocumentType; */ any;
  productDetail: /*  ProductBaseDocumentType; */ any;
}

//async actions
export const getProductBySlug = createAsyncThunk("product/getProductBySlug", async (slug: any) => {
  try {
    const response = await axios.get(`product/${slug}`);
    return response;
  } catch (err) {
    return err.response;
  }
});

interface ProductByIdProp {
  productSlug: string;
  productId: string;
}

export const getProductById = createAsyncThunk("product/getProductbyId", async ({ productId, productSlug }: ProductByIdProp) => {
  try {
    const response = await axios.get(`product/${productSlug}/${productId}`);
    return response;
  } catch (err) {
    return err.response;
  }
});

interface GetPagePayloadType {
  categoryId: string;
  type: string;
}

export const getPage = createAsyncThunk("page/getPage", async ({ categoryId, type }: GetPagePayloadType) => {
  try {
    const response = await axios.get(`page/getPage/${categoryId}/${type}`);

    return response;
  } catch (err) {
    return err.response;
  }
});

//* main structure
const product = createSlice({
  name: "productBySlug",

  initialState: { products: {}, loading: "ready", error: { success: false, errorInfo: undefined }, pageInfo: {}, productDetail: {} } as ProductState,

  reducers: {
    Loading: (state, { payload }) => {
      state.loading = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProductBySlug.fulfilled, (state, { payload }) => {
      if (payload && payload.status === 400) {
        state.error = { success: false, errorInfo: payload };
      } else if (payload && payload.data) {
        state.error = { success: true, errorInfo: undefined };
        state.products = payload.data;
      }
    });

    builder.addCase(getPage.fulfilled, (state, { payload }) => {
      if (payload && payload.status === 400) {
        state.error = { success: false, errorInfo: payload };
      } else if (payload && payload.data) {
        state.error = { success: true, errorInfo: undefined };
        state.pageInfo = payload.data.doc;
      }
    });

    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      if (payload && payload.status === 400) {
        state.error = { success: false, errorInfo: payload };
      } else if (payload && payload.data) {
        state.error = { success: true, errorInfo: undefined };
        state.productDetail = payload.data.result;
      }
    });
  },
});

export default product;

//export actions
export const { Loading } = product.actions;
