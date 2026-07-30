import {
  useEffect,
  useMemo,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useLocation,
  useParams,
} from "react-router-dom";

import { fetchUniversityDetails } from "../../redux/slices/universitySlice";

import {
  getAboutText,
  getInfoItems,
  getYesNoValue,
  joinImageUrl,
} from "./universityDetailsUtils";

export default function useUniversityDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const routeLocation = useLocation();

  const stateUniversity =
    routeLocation.state?.university;

  const stateCountry =
    routeLocation.state?.country;

  const { uid } = useSelector(
    (state) => state.auth
  );

  const safeUid = uid ?? 0;

  const {
    selectedUniversity,
    selectedInfo = [],
    selectedSliders = [],
    selectedCourses = [],
    universityImagePath = "",
    sliderImagePath = "",
    detailsLoading,
    detailsError,
  } = useSelector(
    (state) =>
      state.universityData || {}
  );

  useEffect(() => {
    if (!id) return;

    dispatch(
      fetchUniversityDetails({
        uid: safeUid,
        id,
      })
    );
  }, [
    dispatch,
    id,
    safeUid,
  ]);

  const university =
    selectedUniversity ||
    stateUniversity;

  const data = useMemo(() => {
    if (!university) {
      return null;
    }

    const universityName =
      university?.name ||
      university?.university_name ||
      "University";

    const countryName =
      university?.country ||
      stateCountry?.country ||
      "Country not available";

    const locationText =
      university?.location ||
      university?.city ||
      countryName;

    const ranking =
      university?.rank ||
      university?.ranking ||
      "N/A";

    const universityType =
      university?.type ||
      university?.university_type ||
      "Private University";

    const scholarship =
      getYesNoValue(
        university?.scholarship,
        "Available",
        "Not Available"
      );

    const withoutIelts =
      getYesNoValue(
        university?.without_ielts,
        "Not Required",
        "Required"
      );

    const withoutGre =
      getYesNoValue(
        university?.without_gre,
        "Not Required",
        "Required"
      );

    const withoutGmat =
      getYesNoValue(
        university?.without_gmat,
        "Not Required",
        "Required"
      );

    const applicationFeeWaiver =
      getYesNoValue(
        university?.applicationfeewaiver,
        "Available",
        "Not Available"
      );

    const logo = joinImageUrl(
      universityImagePath,
      university?.logo
    );

    const sliderImages =
      selectedSliders
        .map((item) =>
          joinImageUrl(
            sliderImagePath,
            item?.image
          )
        )
        .filter(Boolean);

    const finalSliderImages =
      sliderImages.length
        ? sliderImages
        : logo
        ? [logo]
        : [];

    const aboutText = getAboutText({
      selectedInfo,
      university,
      universityName,
      locationText,
    });

    const infoItems =
      getInfoItems(selectedInfo);

    const mapQuery =
      encodeURIComponent(
        `${universityName}, ${locationText}`
      );

    return {
      university,
      universityName,
      countryName,
      locationText,
      ranking,
      universityType,
      scholarship,
      withoutIelts,
      withoutGre,
      withoutGmat,
      applicationFeeWaiver,
      logo,
      sliderImages:
        finalSliderImages,
      aboutText,
      infoItems,
      selectedCourses,
      universityImagePath,
      googleMapUrl:
        `https://www.google.com/maps?q=${mapQuery}&output=embed`,
      googleMapOpenUrl:
        `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
    };
  }, [
    selectedCourses,
    selectedInfo,
    selectedSliders,
    sliderImagePath,
    stateCountry?.country,
    university,
    universityImagePath,
  ]);

  return {
    id,
    loading: detailsLoading,
    error: detailsError,
    data,
  };
}