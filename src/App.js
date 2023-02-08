import React, { useEffect,useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Collapse, Table, OverlayTrigger, Popover, Card, Container,Spinner  } from 'react-bootstrap';
//import ButtonClicks from './ButtonClicks'

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
  }, [isLoading]);

  function callChapter(event){
 
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
    
  }
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
          'क़िताब मुकदस'
          /*Bible*/
        )
      }
      </Button>
 
      <Collapse in={open}>
        <div id="collapse-Bible-index">

        <Container fliud>
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
        <OverlayTrigger
          trigger="focus"
          key={book_object.name}
          placement="bottom"
          overlay={
            <Popover id={`popover-positioned-${book_object.name}`}>
              <Popover.Header as="h3">{` ${book_object.name}`}</Popover.Header>
              <Popover.Body>
               
                {
                  book_object.chapters.map((book_chapter) => (
                    <Button variant="outline-success" style={{width: '4rem', margin:1 }} value={book_object.book_id+book_chapter} onClick={callChapter}>{book_chapter}</Button>
                  ))
                }             
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="outline-success" style={{width: '10rem' , margin:1  }} >{book_object.name}</Button>
        </OverlayTrigger>
      ))}
          </td>
        

        </tr>
 
 
      </tbody>
    </Table>

    <Table bordered>
      <thead >
        <tr >
          <th style={{width: '35rem'  }}>नया अहेदनाम <br/>(इंजील मुकदस)</th>
          {/*New Testament */}
        </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          {nt.map((book_object) => (
        <OverlayTrigger
          trigger="focus"
          key={book_object.name}
          placement="bottom"
          overlay={
            <Popover id={`popover-positioned-${book_object.name}`}>
              <Popover.Header as="h3">{` ${book_object.name}`}</Popover.Header>
              <Popover.Body>
              {
                book_object.chapters.map((book_chapter) => (
                  <Button variant="outline-success" style={{width: '4rem', margin:1 }} value={book_object.book_id+book_chapter} onClick={callChapter}>{book_chapter}</Button>
          ))}


              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="outline-success" style={{width: '10rem', margin:1   }}>{book_object.name}</Button>
        </OverlayTrigger>
      ))}
          
          </td>
          

        </tr>
      </tbody>

    </Table>
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
           <Card.Body style={{ textAlign: 'center', fontWeight:'normal'}}>
            <Card.Text>
              RaheNajat.life
            </Card.Text>
           </Card.Body>
        </Card>
        
      </Container>
    </div>
  );
}

export default App;
