import React, { useState } from 'react';
import ReactFileReader from 'react-file-reader';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { DynamicDates } from 'types';
import { loadTasks, tasksStateSelector } from 'app';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  CalendarActionsStyled,
  StyledInfo,
  StyledInfoBtn,
} from '../styles/calendar-actions.styled';

export const CalendarActions = () => {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<string | null>();
  const [showInfo, setShowInfo] = useState(false);
  const tasks = useAppSelector(tasksStateSelector);

  const download = () => {
    const body = document.querySelector('body');
    if (body) {
      html2canvas(body, { logging: false }).then((r) => {
        const url = r.toDataURL();
        setImage(url);
      });
    }
  };

  const isTasks = (arg: any): arg is { tasks: DynamicDates } => {
    return arg.tasks !== undefined;
  };
  return (
    <CalendarActionsStyled>
      <button type="button" onClick={() => download()}>
        Print
      </button>
      <div>
        <ReactFileReader
          multipleFiles={false}
          fileTypes={['.json']}
          handleFiles={(event: FileList) => {
            const file = event[0];
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target && typeof e.target.result === 'string') {
                const loadedTasks = JSON.parse(e.target.result);
                const loadFiles = (files: { tasks: DynamicDates }) => {
                  if (isTasks(files)) {
                    dispatch(loadTasks(files.tasks));
                  } else {
                    alert('Something is wrong with JSON file');
                  }
                };
                loadFiles(loadedTasks);
              }
            };

            reader.readAsText(file);
          }}
        >
          <button type="button" style={{ position: 'relative' }}>
            Import{' '}
            <StyledInfoBtn
              onMouseOver={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
            >
              !
            </StyledInfoBtn>
            {showInfo && (
              <StyledInfo>
                <h2>JSON example</h2>
                <pre>
                  {JSON.stringify(
                    {
                      tasks: {
                        '2023-01-04': [
                          { id: 1, task: 'task1', label: ['red', 'green'] },
                          { id: 2, task: 'task2', label: ['red'] },
                        ],
                      },
                    },
                    null,
                    2
                  )}
                </pre>
              </StyledInfo>
            )}
          </button>
        </ReactFileReader>
      </div>
      <button
        type="button"
        onClick={() => {
          const blob = new Blob([JSON.stringify({ tasks })], { type: 'text/plain;charset=utf-8' });
          saveAs(blob, 'data.json');
        }}
      >
        Export
      </button>
      {image && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '10px',
            zIndex: 100,
            width: '800px',
            minHeight: '450px',
            right: '50%',
            transform: 'translateX(50%)',
          }}
        >
          <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={image} alt="" />
          <button
            type="button"
            onClick={() => {
              saveAs(image, 'image');
            }}
          >
            install
          </button>
          <button type="button" onClick={() => setImage(null)}>
            close
          </button>
        </div>
      )}
    </CalendarActionsStyled>
  );
};
