import React, { useEffect,useState,useRef,useCallback} from 'react';
import './App.css';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Collapse, Table,Overlay, Popover, Card, Container,Spinner,Tabs,Tab } from 'react-bootstrap';


var ot= [];
var nt=[];
var chapter_content=[];
var chapter_name="";
var bibleButtonDisabled=true;
var isLoading=true; 



function App() {
 
  const [open, setOpen] = useState(false);
  const [chapterLoading, setChapterLoading] = useState(false);
  //fetch('https://4.dbt.io/api/bibles/URDIRV?key=1462b719-42d8-0874-7c50-905063472458&v=4').then((response) => response.json()).then((json) => console.log(json));
  //fetch('https://4.dbt.io/api/bibles/URDIRV?key=1462b719-42d8-0874-7c50-905063472458&v=4').then((response) => response.json()).then((json) => {console.log(json)});
  
  useEffect(() => {
    if (isLoading) {
      /*simulateNetworkRequest().then(() => {
        setLoading(false);
      });*/
      fetch('https://4.dbt.io/api/bibles/URDIRV?key=1462b719-42d8-0874-7c50-905063472458&v=4').then((response) => response.json())
      .then((json) => { ot = [];nt=[];console.log(json);
      /*for (var i = 0; i < 39; i++) {ot.push(json.data.books[i].name+"("+ json.data.books[i].chapters.length+")");}
      for (var i = 39; i < 66; i++) {nt.push(json.data.books[i].name+"("+ json.data.books[i].chapters.length+")");}*/
        for (var i = 0; i < 39; i++) {ot.push(json.data.books[i]);}
        for (i = 39; i < 66; i++) {nt.push(json.data.books[i]);}})
      .then(()=>{setOpen(true);bibleButtonDisabled=false;isLoading=false;});
    }
  }, []);

  const  callChapter=useCallback((event) => {
 
    var book_id=event.target.value.substr(0,3);
    var bookChapter=event.target.value.substr(3);
    setChapterLoading(true);
    setOpen(false);
    //alert("Fetching Data Book "+book_id+" Chapter "+bookChapter);

      fetch('https://4.dbt.io/api/bibles/filesets/URDIRV/'+book_id+'/'+bookChapter+'?key=1462b719-42d8-0874-7c50-905063472458&v=4').then((response) => response.json())
      .then((json) => { 
        chapter_content=[];
        console.log(json);
        //alert(json.data[0].book_name_alt+" "+json.data[0].chapter_alt);
        //chapter_content.push(json.data[0].book_name_alt+" "+json.data[0].chapter_alt);
        chapter_name=json.data[0].book_name_alt+" "+json.data[0].chapter_alt;
        for (var i = 0; i < json.data.length; i++) {chapter_content.push(json.data[i].verse_start_alt+". "+json.data[i].verse_text+"\n");}
        //alert(chapter_content);
        console.log(chapter_content);
      })
      .then(()=>{setChapterLoading(false);});
  },[]);

  return (
    <div className="App">
    
   
     <Button variant="success"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className=" "
        style={{width: '10rem' , borderRadius:10 }}
        disabled={bibleButtonDisabled}
      >
        {isLoading ? (
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          'किताब ए मुकद्दस'
          /*Bible*/
        )
      }
      </Button>
      <br/><br/>

      <Collapse in={open}>
        <div id="collapse-Bible-index">

        <Container fliud>

        <Tabs
      defaultActiveKey="nt"
      id="justify-tab-example"
      justify
    >
      <Tab eventKey="ot" title="पुराना अहेदनामा">
      <Table  bordered >
      <thead >
        <tr >

          <th style={{width: '35rem'  }}>पुराना अहेदनामा <br/>(तौरेत, ज़बुर और सहाएफ अंबिया)</th>
                                      {/*Old Testament */}

        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
          {
          ot.map((book_object) => (
        
        <ChapterNav bookData={book_object} callChapter={callChapter}/>

      ))}
          </td>
        </tr>
      </tbody>
    </Table>
      </Tab>
      <Tab eventKey="nt" title="नया अहेदनामा">
      <Table bordered>
      <thead >
        <tr >
          <th style={{width: '35rem'  }}>नया अहेदनामा <br/>(इंजील मुकद्दस)</th>
          {/*New Testament */}
        </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          {nt.map((book_object) => (
        <ChapterNav bookData={book_object} callChapter={callChapter}/>
      ))}
          
          </td>
          

        </tr>
      </tbody>

    </Table>
      </Tab>

    </Tabs>
    </Container>
        </div>
       
      </Collapse>  
      
      <Container fluid>
        <Card  
          className="mb-2" >
          <Card.Header>
            <Card.Title>{chapter_name}</Card.Title>
          </Card.Header>
            <Card.Body style={{ textAlign: 'left', fontWeight:'bold'}}>
              <Card.Text>

          
          {chapterLoading ? (
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          chapter_content.map((verses) => (
            <>{verses}<br/></>
      )
      )
          /*Chapter*/
        )
          }
            </Card.Text>
           </Card.Body>

           <Card.Footer style={{backgroundColor: 'lightgreen', textEmphasisColor: 'white'}} className="text-muted">RaheNajat.Life</Card.Footer>
        </Card>
        
      </Container>
    </div>
  );
}
function ChapterNav(props ){
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const buttons = [];
 function callingChapter(){
  chapter_name="";
  setShow(false);
 }
  for (let i = 1; i <= props.bookData.chapters.length; i++) {
    buttons.push(<Button style={{width: '4rem', margin:1 }} value={props.bookData.book_id+`${i}`} variant='outline-success' onMouseDownCapture={callingChapter} onClick={props.callChapter}>{i}</Button>);
}
  return(
            <>
                <Overlay
                target={target.current}
                show={show}
                placement='bottom'
                rootClose='true'
                rootCloseEvent='mousedown'
                onHide={()=>setShow(false)}
                >
                  <Popover id={`popover-positioned-1`} onMouseEnter={()=> setShow(true)} onMouseLeave={()=>setShow(false)}>
                      <Popover.Header as="h1">{props.bookData.name}</Popover.Header>
                      <Popover.Body>
                          {buttons}
                      </Popover.Body>
                  </Popover>
                </Overlay>
                      
                <Button variant='outline-success' style={{width: '10rem', margin:1   }} ref={target} onMouseDown={()=> setShow(true)} >{props.bookData.name}</Button>

            </>

  );
}
export default App;