


import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../App/apiService";
import { initialStateType } from "./websiteSliceType";

const initialState: initialStateType = {
  isLoading: false,
  websiteName: "",
  professionalTitle: "",
  menus: [],
  homePage: [],
  error: null,
};

export const fetchOrCreateWebsiteData = createAsyncThunk(
  "website/create",
  async (templateId: string, { rejectWithValue }) => {
    try {
      const defaultPages = [
        {
          name: "Home",
          slug: "/",
          components: ["HeaderOne", "CoverOne"]
        }
      ];
      
      const data = {
        templateId,
        pages: defaultPages
      };

      const response = await api.post("/website/post", data);
      return response.data.payload;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create website");
    }
  }
);


// New thunk for updating component values
export const updateComponentValue = createAsyncThunk(
  "website/updateComponentValue",
  async ({ dataId, newValue }: { dataId: string; newValue: string | string[] }, { rejectWithValue }) => {
    try {
      const response = await api.patch("/website/update-data", {
        dataId,
        newValue
      });
      return response.data.payload;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update component");
    }
  }
);


export const websiteSlice = createSlice({
  name: "website",
  initialState,
  reducers: {
    resetWebsiteState: () => {
      return { ...initialState };
    },
    updateWebsiteName: (state, action: PayloadAction<string>) => {
      state.websiteName = action.payload;
    },
    updateProfessionalTitle: (state, action: PayloadAction<string>) => {
      state.professionalTitle = action.payload;
    },
    updateMenu: (state, action: PayloadAction<{ index: number; value: string }>) => {
      const { index, value } = action.payload;
      if (state.menus[index] !== undefined) {
        state.menus[index] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrCreateWebsiteData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrCreateWebsiteData.fulfilled, (state, action) => {
        state.isLoading = false;
        
        const homePage = action.payload.pages.find((page:any) => page.name === "Home");
        const headerComponent = homePage?.components.find(
          (comp: any) => comp.name === "HeaderOne" || comp.name === "HeaderTwo"
        );
        
        if (headerComponent) {
          const websiteNameData = headerComponent.data.find(
            (item: any) => item.path === "websiteName"
          );
          const navigationData = headerComponent.data.find(
            (item: any) => item.path === "Navigation"
          );
          
          state.websiteName = websiteNameData?.value || "";
          state.menus = navigationData?.value || [];
        }
        
        const coverComponent = homePage?.components.find(
          (comp:any) => comp.name === "CoverOne" || comp.name === "CoverTwo"
        );
        
        if (coverComponent) {
          const titleData = coverComponent.data.find(
            (item: any) => item.path === "professionalTitle"
          );
          state.professionalTitle = titleData?.value || "";
        }
      })
      .addCase(fetchOrCreateWebsiteData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

       // New cases for updateComponentValue
       .addCase(updateComponentValue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateComponentValue.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the state based on the updated data from the server
        const homePage = action.payload.pages.find((page:any) => page.name === "Home");
        
        // Update header component data
        const headerComponent = homePage?.components.find(
          (comp: any) => comp.name === "HeaderOne" || comp.name === "HeaderTwo"
        );
        if (headerComponent) {
          const websiteNameData = headerComponent.data.find(
            (item: any) => item.path === "websiteName"
          );
          const navigationData = headerComponent.data.find(
            (item: any) => item.path === "Navigation"
          );
          
          if (websiteNameData) state.websiteName = websiteNameData.value;
          if (navigationData) state.menus = navigationData.value;
        }
        
        // Update cover component data
        const coverComponent = homePage?.components.find(
          (comp: any) => comp.name === "CoverOne" || comp.name === "CoverTwo"
        );
        if (coverComponent) {
          const titleData = coverComponent.data.find(
            (item: any) => item.path === "professionalTitle"
          );
          if (titleData) state.professionalTitle = titleData.value;
        }
      })
      .addCase(updateComponentValue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  resetWebsiteState, 
  updateWebsiteName, 
  updateProfessionalTitle, 
  updateMenu 
} = websiteSlice.actions;

export default websiteSlice.reducer;