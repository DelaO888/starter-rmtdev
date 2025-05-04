import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { useJobItems } from "../lib/hooks";

function App() {
  const [searchText, setSearchText] = useState("");

  const [jobItems, isLoading, totalNumberOfResults] = useJobItems(searchText);

  return (
    <>
      <Background></Background>

      <Header>
        <HeaderTop>
          <Logo></Logo>
          <BookmarksButton></BookmarksButton>
        </HeaderTop>

        <SearchForm
          searchText={searchText}
          setSearchText={setSearchText}
        ></SearchForm>
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount
              totalNumberOfResults={totalNumberOfResults}
            ></ResultsCount>
            <SortingControls></SortingControls>
          </SidebarTop>
          <JobList jobItems={jobItems} isLoading={isLoading}></JobList>
          <PaginationControls></PaginationControls>
        </Sidebar>
        <JobItemContent></JobItemContent>
      </Container>

      <Footer></Footer>
    </>
  );
}

export default App;
