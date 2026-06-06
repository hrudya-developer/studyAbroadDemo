import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "overseas@Miak2023";

const DEFAULT_ICON_PATH =
  "https://overseas.technocitysolutions.com/public/images/icons/";

const DEFAULT_IMAGE_PATH =
  "https://overseas.technocitysolutions.com/public/images/";

const DEFAULT_THUMB_PATH =
  "https://overseas.technocitysolutions.com/public/images/shorts/";

const makeUrl = (basePath, file) => {
  if (!file) return "";

  if (String(file).startsWith("http")) {
    return file;
  }

  return `${basePath}${file}`;
};

const normalizeItems = (items, imagePath = "") => {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item && item.status !== "0")
    .sort((a, b) => Number(a?.order || 0) - Number(b?.order || 0))
    .map((item) => ({
      ...item,
      imageUrl: makeUrl(imagePath, item?.image),
    }));
};

const normalizeIconItems = (items, iconPath = "") => {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item && item.status !== "0")
    .sort((a, b) => Number(a?.order || 0) - Number(b?.order || 0))
    .map((item) => ({
      ...item,
      iconUrl:
        item?.icon && String(item.icon).includes(".")
          ? makeUrl(iconPath, item.icon)
          : "",
    }));
};

export const fetchGermanPrograms = createAsyncThunk(
  "germanProgram/fetchGermanPrograms",
  async ({ uid = 0, id = 6 } = {}, { rejectWithValue }) => {
    try {
      const url = `https://overseas.technocitysolutions.com/public/api/getHomeTileDetails?api=${encodeURIComponent(
        API_KEY
      )}&uid=${uid}&id=${id}`;

      const response = await fetch(url, {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result?.message || "Failed to fetch programs");
      }

      return result;
    } catch (error) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);

const initialState = {
  mainData: null,

  benefits: [],
  stipend: [],
  eligibility: [],
  roadmap: [],
  streams: [],
  relatedPrograms: [],
  youtube: [],
  details: [],

  imagePath: DEFAULT_IMAGE_PATH,
  iconPath: DEFAULT_ICON_PATH,
  thumbPath: DEFAULT_THUMB_PATH,

  loading: false,
  error: null,
};

const germanProgramSlice = createSlice({
  name: "germanProgram",
  initialState,

  reducers: {
    clearGermanPrograms: (state) => {
      state.mainData = null;
      state.benefits = [];
      state.stipend = [];
      state.eligibility = [];
      state.roadmap = [];
      state.streams = [];
      state.relatedPrograms = [];
      state.youtube = [];
      state.details = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGermanPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchGermanPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const responseData = action.payload || {};

        const imagePath = responseData.slider_image_path || DEFAULT_IMAGE_PATH;
        const iconPath = responseData.icons_image_path || DEFAULT_ICON_PATH;
        const thumbPath = responseData.thumb_image_path || DEFAULT_THUMB_PATH;

        const mainData = Array.isArray(responseData.data)
          ? responseData.data[0] || null
          : responseData.data || null;

        state.imagePath = imagePath;
        state.iconPath = iconPath;
        state.thumbPath = thumbPath;

        state.mainData = mainData
          ? {
              ...mainData,
              imageUrl: makeUrl(imagePath, mainData?.image),
              iconUrl: makeUrl(iconPath, mainData?.icon),
            }
          : null;

        state.benefits = normalizeIconItems(responseData.benefit, iconPath);

        state.stipend = normalizeIconItems(responseData.stipend, iconPath);

        state.eligibility = normalizeIconItems(
          responseData.eligibility,
          iconPath
        );

        state.roadmap = normalizeItems(responseData.roadmap, imagePath).map(
          (item) => ({
            ...item,
            iconUrl: makeUrl(iconPath, item?.icon),
            countUrl: makeUrl(iconPath, item?.count),
          })
        );

        state.streams = normalizeIconItems(responseData.streams, iconPath);

        state.details = normalizeIconItems(responseData.details, iconPath);

        state.relatedPrograms = [
          {
            id: responseData.related1_id,
            name: responseData.related1_name,
            image: responseData.related1_image,
          },
          {
            id: responseData.related2_id,
            name: responseData.related2_name,
            image: responseData.related2_image,
          },
          {
            id: responseData.related3_id,
            name: responseData.related3_name,
            image: responseData.related3_image,
          },
        ]
          .filter((item) => item.id || item.name)
          .map((item) => ({
            ...item,
            imageUrl: makeUrl(imagePath, item.image),
          }));

        state.youtube = Array.isArray(responseData.youtube)
          ? responseData.youtube
              .filter((item) => item && item.status !== "0")
              .map((item) => ({
                ...item,
                thumbnailUrl: makeUrl(thumbPath, item?.thumbnail),
              }))
          : [];
      })

      .addCase(fetchGermanPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch German programs";
      });
  },
});

export const { clearGermanPrograms } = germanProgramSlice.actions;

export default germanProgramSlice.reducer;