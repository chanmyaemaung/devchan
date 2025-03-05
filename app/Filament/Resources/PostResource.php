<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PostResource\Pages;
use App\Filament\Resources\PostResource\RelationManagers;
use App\Models\Post;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\SelectColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationGroup = 'Blog';
    protected static ?string $navigationLabel = 'Posts';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('user_id')
                    ->label('Author')
                    ->options(User::all()->pluck('name', 'id'))
                    ->hidden(),
                Section::make('Post Information')
                    ->description(__('Enter the post details.'))
                    ->collapsible()
                    ->columnSpan(4)
                    ->schema([
                        Group::make([
                            TextInput::make('title')
                                ->live()
                                ->afterStateUpdated(function (string $state, Set $set) {
                                    $set('slug', Str::slug($state) ?? '');
                                })
                                ->required(),
                            TextInput::make('slug')
                                ->disabled()
                                ->unique(ignoreRecord: true)
                                ->required(),
                        ])->columns(2),

                        Group::make([
                            TextArea::make('excerpt')
                                ->label(__('Excerpt'))
                                ->rows(3)
                                ->columnSpanFull(),
                            RichEditor::make('body')
                                ->columnSpanFull(),
                        ])->columns(1),
                    ]),

                Section::make('Post Meta')
                    ->description(__('Enter the post meta details.'))
                    ->collapsible()
                    ->columnSpan(2)
                    ->schema([
                        Group::make([
                            FileUpload::make('thumbnail')
                                ->label(__('Thumbnail Image'))
                                ->disk('public')
                                ->directory('posts')
                                ->placeholder(__('Upload thumbnail image'))
                                ->acceptedFileTypes(['image/*']),
                            Select::make('status')
                                ->options([
                                    'draft' => 'Draft',
                                    'published' => 'Published',
                                    'archived' => 'Archived',
                                ])->default('draft'),
                            Select::make('categories')
                                ->relationship('categories', 'name')
                                ->multiple()
                                ->preload(),
                            DateTimePicker::make('published_at'),
                        ])->columns(1),
                    ]),
            ])->columns(6);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->numeric()
                    ->hidden(),
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('excerpt')
                    ->searchable(),
                SelectColumn::make('status')
                    ->label(__('Status'))
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                        'archived' => 'Archived',
                    ])
                    ->selectablePlaceholder(false)
                    ->sortable(),
                TextColumn::make('slug')
                    ->searchable(),
                ImageColumn::make('thumbnail')
                    ->label(__('Thumbnail')),
                TextColumn::make('views')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\DeleteAction::make(),
                ]),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'view' => Pages\ViewPost::route('/{record}'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}
